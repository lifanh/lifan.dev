// @vitest-environment node

import { SignJWT } from 'jose';
import { describe, expect, it, vi } from 'vitest';

import {
  HUB_AUTH_TRANSACTION_COOKIE,
  HUB_SESSION_COOKIE,
  beginOidcSignIn,
  finishHubSignOut,
  finishOidcCallback,
  readHubAuthEnv,
  readHubSession,
  readOidcTransaction,
  sanitizeReturnPath,
  type HubAuthEnv,
} from './auth';

const env: HubAuthEnv = {
  HUB_OIDC_CLIENT_SECRET: 'test-client-secret-with-enough-entropy',
  HUB_SESSION_SECRET: 'test-session-secret-with-enough-entropy',
};

const discovery = {
  issuer: 'https://auth.lifan.dev',
  authorization_endpoint: 'https://auth.lifan.dev/api/auth/oauth2/authorize',
  token_endpoint: 'https://auth.lifan.dev/api/auth/oauth2/token',
  userinfo_endpoint: 'https://auth.lifan.dev/api/auth/oauth2/userinfo',
};

describe('Hub OIDC relying party', () => {
  it('prefers Cloudflare runtime bindings and copies only Hub auth secrets', () => {
    const previousClientSecret = process.env.HUB_OIDC_CLIENT_SECRET;
    const previousSessionSecret = process.env.HUB_SESSION_SECRET;
    process.env.HUB_OIDC_CLIENT_SECRET = 'process-client-secret';
    process.env.HUB_SESSION_SECRET = 'process-session-secret';

    try {
      expect(
        readHubAuthEnv({
          runtime: {
            env: {
              HUB_OIDC_CLIENT_SECRET: 'runtime-client-secret',
              HUB_SESSION_SECRET: 'runtime-session-secret',
              UNRELATED_SECRET: 'must-not-be-copied',
            },
          },
        }),
      ).toEqual({
        HUB_OIDC_CLIENT_SECRET: 'runtime-client-secret',
        HUB_SESSION_SECRET: 'runtime-session-secret',
      });
    } finally {
      restoreEnv('HUB_OIDC_CLIENT_SECRET', previousClientSecret);
      restoreEnv('HUB_SESSION_SECRET', previousSessionSecret);
    }
  });

  it('keeps only safe root-relative return paths', () => {
    expect(sanitizeReturnPath('/tools?mode=learn#module-2')).toBe('/tools?mode=learn#module-2');
    expect(sanitizeReturnPath('')).toBe('/');
    expect(sanitizeReturnPath('//evil.example/path')).toBe('/');
    expect(sanitizeReturnPath('/\\evil.example/path')).toBe('/');
    expect(sanitizeReturnPath('https://evil.example/path')).toBe('/');
    expect(sanitizeReturnPath('/tools\nLocation: https://evil.example')).toBe('/');
  });

  it('starts authorization with S256 PKCE and an encrypted host-only transaction cookie', async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(discovery));
    const response = await beginOidcSignIn(
      new Request('https://lifan.dev/api/auth/sign-in?returnTo=%2Ftools%3Fmode%3Dlearn'),
      env,
      fetchImpl,
    );

    expect(response.status).toBe(302);
    expect(response.headers.get('cache-control')).toBe('no-store');

    const authorizationUrl = new URL(response.headers.get('location')!);
    expect(authorizationUrl.origin).toBe('https://auth.lifan.dev');
    expect(authorizationUrl.searchParams.get('client_id')).toBe('lifan-dev-hub');
    expect(authorizationUrl.searchParams.get('redirect_uri')).toBe(
      'https://lifan.dev/api/auth/oauth2/callback/external-oidc',
    );
    expect(authorizationUrl.searchParams.get('response_type')).toBe('code');
    expect(authorizationUrl.searchParams.get('scope')).toBe('openid profile email');
    expect(authorizationUrl.searchParams.get('code_challenge_method')).toBe('S256');
    expect(authorizationUrl.searchParams.get('code_challenge')).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(authorizationUrl.searchParams.get('state')).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(authorizationUrl.searchParams.get('nonce')).toMatch(/^[A-Za-z0-9_-]+$/);

    const transactionCookie = getSetCookie(response, HUB_AUTH_TRANSACTION_COOKIE);
    expect(transactionCookie).toContain('Secure');
    expect(transactionCookie).toContain('HttpOnly');
    expect(transactionCookie).toContain('SameSite=Lax');
    expect(transactionCookie).toContain('Path=/');
    expect(transactionCookie).not.toContain('Domain=');

    const transaction = await readOidcTransaction(cookieHeader(transactionCookie), env);
    expect(transaction?.returnTo).toBe('/tools?mode=learn');
    expect(transaction?.state).toBe(authorizationUrl.searchParams.get('state'));
    expect(transaction?.nonce).toBe(authorizationUrl.searchParams.get('nonce'));
    expect(fetchImpl).toHaveBeenCalledOnce();
  });

  it('fails closed when discovery points a protocol endpoint away from auth.lifan.dev', async () => {
    const response = await beginOidcSignIn(
      new Request('https://lifan.dev/api/auth/sign-in'),
      env,
      async () => jsonResponse({ ...discovery, token_endpoint: 'https://evil.example/token' }),
    );

    expect(response.status).toBe(502);
    expect(response.headers.get('set-cookie')).toBeNull();
  });

  it('fails closed without both local runtime secrets', async () => {
    const fetchImpl = vi.fn();
    const response = await beginOidcSignIn(
      new Request('https://lifan.dev/api/auth/sign-in'),
      { HUB_OIDC_CLIENT_SECRET: env.HUB_OIDC_CLIENT_SECRET },
      fetchImpl,
    );

    expect(response.status).toBe(503);
    expect(response.headers.get('set-cookie')).toBeNull();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('completes the code flow from verified ID-token and UserInfo identities', async () => {
    const started = await beginOidcSignIn(
      new Request('https://lifan.dev/api/auth/sign-in?returnTo=%2Ftools%3Fmode%3Dlearn'),
      env,
      async () => jsonResponse(discovery),
    );
    const transactionCookie = getSetCookie(started, HUB_AUTH_TRANSACTION_COOKIE);
    const transactionCookieHeader = cookieHeader(transactionCookie);
    const transaction = await readOidcTransaction(transactionCookieHeader, env);
    expect(transaction).not.toBeNull();

    const idToken = await createIdToken({ nonce: transaction!.nonce, subject: 'user-123' });
    const requests: Array<{ url: string; headers: Headers }> = [];
    const fetchImpl = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      requests.push({ url, headers: new Headers(init?.headers) });
      if (url.endsWith('/.well-known/openid-configuration')) return jsonResponse(discovery);
      if (url === discovery.token_endpoint) {
        expect(init?.method).toBe('POST');
        expect(new Headers(init?.headers).get('authorization')).toBe(
          `Basic ${btoa(`lifan-dev-hub:${env.HUB_OIDC_CLIENT_SECRET}`)}`,
        );
        expect(new URLSearchParams(init?.body as string).get('code_verifier')).toBe(
          transaction!.codeVerifier,
        );
        return jsonResponse({
          access_token: 'provider-access-token',
          token_type: 'Bearer',
          expires_in: 3600,
          id_token: idToken,
        });
      }
      if (url === discovery.userinfo_endpoint) {
        expect(new Headers(init?.headers).get('authorization')).toBe('Bearer provider-access-token');
        return jsonResponse({
          sub: 'user-123',
          email: 'learner@example.com',
          email_verified: true,
          name: 'Curious Learner',
        });
      }
      throw new Error(`Unexpected request: ${url}`);
    });

    const response = await finishOidcCallback(
      new Request(
        `https://lifan.dev/api/auth/oauth2/callback/external-oidc?code=authorization-code&state=${encodeURIComponent(transaction!.state)}`,
        { headers: { cookie: transactionCookieHeader } },
      ),
      env,
      fetchImpl,
    );

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/tools?mode=learn');
    expect(response.headers.get('cache-control')).toBe('no-store');

    const sessionCookie = getSetCookie(response, HUB_SESSION_COOKIE);
    expect(sessionCookie).toContain('Secure');
    expect(sessionCookie).toContain('HttpOnly');
    expect(sessionCookie).toContain('SameSite=Lax');
    expect(sessionCookie).not.toContain('Domain=');
    expect(getSetCookie(response, HUB_AUTH_TRANSACTION_COOKIE)).toContain('Max-Age=0');

    await expect(readHubSession(cookieHeader(sessionCookie), env)).resolves.toMatchObject({
      issuer: 'https://auth.lifan.dev',
      subject: 'user-123',
      email: 'learner@example.com',
      emailVerified: true,
      name: 'Curious Learner',
    });
    expect(requests.every(({ headers }) => !headers.has('cookie'))).toBe(true);
  });

  it('rejects mismatched state before exchanging the authorization code', async () => {
    const started = await beginOidcSignIn(
      new Request('https://lifan.dev/api/auth/sign-in'),
      env,
      async () => jsonResponse(discovery),
    );
    const transactionCookie = getSetCookie(started, HUB_AUTH_TRANSACTION_COOKIE);
    const fetchImpl = vi.fn();

    const response = await finishOidcCallback(
      new Request(
        'https://lifan.dev/api/auth/oauth2/callback/external-oidc?code=authorization-code&state=wrong',
        { headers: { cookie: cookieHeader(transactionCookie) } },
      ),
      env,
      fetchImpl,
    );

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/?auth=failed');
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(findSetCookie(response, HUB_SESSION_COOKIE)).toBeUndefined();
    expect(getSetCookie(response, HUB_AUTH_TRANSACTION_COOKIE)).toContain('Max-Age=0');
  });

  it('does not create a session when the ID-token nonce is wrong', async () => {
    const { request, fetchImpl } = await callbackFixture({ tokenNonce: 'wrong-nonce' });
    const response = await finishOidcCallback(request, env, fetchImpl);

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/?auth=failed');
    expect(findSetCookie(response, HUB_SESSION_COOKIE)).toBeUndefined();
  });

  it('does not create a session for an ID token from the wrong issuer', async () => {
    const { request, fetchImpl } = await callbackFixture({
      tokenIssuer: 'https://evil.example',
    });
    const response = await finishOidcCallback(request, env, fetchImpl);

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/?auth=failed');
    expect(findSetCookie(response, HUB_SESSION_COOKIE)).toBeUndefined();
  });

  it('does not create a session when the ID token omits its required issuer', async () => {
    const { request, fetchImpl } = await callbackFixture({ tokenIssuer: null });
    const response = await finishOidcCallback(request, env, fetchImpl);

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/?auth=failed');
    expect(findSetCookie(response, HUB_SESSION_COOKIE)).toBeUndefined();
  });

  it('does not create a session for an ID token signed with another key', async () => {
    const { request, fetchImpl } = await callbackFixture({
      tokenSecret: 'another-client-secret-with-enough-entropy',
    });
    const response = await finishOidcCallback(request, env, fetchImpl);

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/?auth=failed');
    expect(findSetCookie(response, HUB_SESSION_COOKIE)).toBeUndefined();
  });

  it('does not create a session when UserInfo and ID-token subjects differ', async () => {
    const { request, fetchImpl } = await callbackFixture({ userInfoSubject: 'other-user' });
    const response = await finishOidcCallback(request, env, fetchImpl);

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/?auth=failed');
    expect(findSetCookie(response, HUB_SESSION_COOKIE)).toBeUndefined();
  });

  it('clears the transaction and preserves its safe return path when access is denied', async () => {
    const started = await beginOidcSignIn(
      new Request('https://lifan.dev/api/auth/sign-in?returnTo=%2Ftools'),
      env,
      async () => jsonResponse(discovery),
    );
    const transactionCookie = getSetCookie(started, HUB_AUTH_TRANSACTION_COOKIE);
    const transactionCookieHeader = cookieHeader(transactionCookie);
    const transaction = await readOidcTransaction(transactionCookieHeader, env);
    const fetchImpl = vi.fn();
    const response = await finishOidcCallback(
      new Request(
        `https://lifan.dev/api/auth/oauth2/callback/external-oidc?error=access_denied&state=${encodeURIComponent(transaction!.state)}`,
        { headers: { cookie: transactionCookieHeader } },
      ),
      env,
      fetchImpl,
    );

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/tools?auth=cancelled');
    expect(getSetCookie(response, HUB_AUTH_TRANSACTION_COOKIE)).toContain('Max-Age=0');
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('rejects an expired OIDC transaction cookie', async () => {
    const started = await beginOidcSignIn(
      new Request('https://lifan.dev/api/auth/sign-in'),
      env,
      async () => jsonResponse(discovery),
    );
    const transactionCookie = getSetCookie(started, HUB_AUTH_TRANSACTION_COOKIE);

    vi.useFakeTimers();
    vi.setSystemTime(Date.now() + 11 * 60 * 1000);
    try {
      await expect(readOidcTransaction(cookieHeader(transactionCookie), env)).resolves.toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it('clears only the host-local session on a same-origin POST', async () => {
    const rejected = await finishHubSignOut(
      new Request('https://lifan.dev/api/auth/sign-out', {
        method: 'POST',
        headers: { origin: 'https://evil.example' },
      }),
    );
    expect(rejected.status).toBe(403);
    expect(rejected.headers.get('set-cookie')).toBeNull();

    const response = await finishHubSignOut(
      new Request('https://lifan.dev/api/auth/sign-out', {
        method: 'POST',
        headers: { origin: 'https://lifan.dev' },
      }),
    );
    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/');
    const deletion = getSetCookie(response, HUB_SESSION_COOKIE);
    expect(deletion).toContain('Max-Age=0');
    expect(deletion).toContain('Secure');
    expect(deletion).toContain('Path=/');
    expect(deletion).not.toContain('Domain=');
  });
});

async function callbackFixture({
  tokenNonce,
  tokenIssuer,
  tokenSecret,
  userInfoSubject = 'user-123',
}: {
  tokenNonce?: string;
  tokenIssuer?: string | null;
  tokenSecret?: string;
  userInfoSubject?: string;
}) {
  const started = await beginOidcSignIn(
    new Request('https://lifan.dev/api/auth/sign-in'),
    env,
    async () => jsonResponse(discovery),
  );
  const transactionCookie = getSetCookie(started, HUB_AUTH_TRANSACTION_COOKIE);
  const transactionCookieHeader = cookieHeader(transactionCookie);
  const transaction = await readOidcTransaction(transactionCookieHeader, env);
  const idToken = await createIdToken({
    nonce: tokenNonce ?? transaction!.nonce,
    subject: 'user-123',
    issuer: tokenIssuer,
    secret: tokenSecret,
  });

  const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
    const url = input.toString();
    if (url.endsWith('/.well-known/openid-configuration')) return jsonResponse(discovery);
    if (url === discovery.token_endpoint) {
      return jsonResponse({
        access_token: 'provider-access-token',
        token_type: 'Bearer',
        id_token: idToken,
      });
    }
    if (url === discovery.userinfo_endpoint) {
      return jsonResponse({
        sub: userInfoSubject,
        email: 'learner@example.com',
        email_verified: true,
        name: 'Curious Learner',
      });
    }
    throw new Error(`Unexpected request: ${url}`);
  });

  return {
    request: new Request(
      `https://lifan.dev/api/auth/oauth2/callback/external-oidc?code=authorization-code&state=${encodeURIComponent(transaction!.state)}`,
      { headers: { cookie: transactionCookieHeader } },
    ),
    fetchImpl,
  };
}

async function createIdToken({
  nonce,
  subject,
  issuer = 'https://auth.lifan.dev',
  secret = env.HUB_OIDC_CLIENT_SECRET!,
}: {
  nonce: string;
  subject: string;
  issuer?: string | null;
  secret?: string;
}) {
  const token = new SignJWT({ nonce })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setAudience('lifan-dev-hub')
    .setSubject(subject)
    .setIssuedAt()
    .setNotBefore('0s')
    .setExpirationTime('5m');
  if (issuer) token.setIssuer(issuer);
  return token.sign(new TextEncoder().encode(secret));
}

function jsonResponse(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function findSetCookie(response: Response, name: string) {
  return response.headers.getSetCookie().find((value) => value.startsWith(`${name}=`));
}

function getSetCookie(response: Response, name: string) {
  const value = findSetCookie(response, name);
  if (!value) throw new Error(`Missing ${name} Set-Cookie header`);
  return value;
}

function cookieHeader(setCookie: string) {
  return setCookie.slice(0, setCookie.indexOf(';'));
}

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}
