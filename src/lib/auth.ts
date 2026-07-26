import { EncryptJWT, jwtDecrypt, jwtVerify } from 'jose';
import { z } from 'zod';

export const HUB_SESSION_COOKIE = '__Host-lifan_hub_session';
export const HUB_AUTH_TRANSACTION_COOKIE = '__Host-lifan_hub_oidc';

const HUB_ORIGIN = 'https://lifan.dev';
const OIDC_ISSUER = 'https://auth.lifan.dev';
const OIDC_DISCOVERY_URL = `${OIDC_ISSUER}/.well-known/openid-configuration`;
const OIDC_CLIENT_ID = 'lifan-dev-hub';
const OIDC_CALLBACK_URL = `${HUB_ORIGIN}/api/auth/oauth2/callback/external-oidc`;
const TRANSACTION_TTL_SECONDS = 10 * 60;
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

const discoverySchema = z.object({
  issuer: z.literal(OIDC_ISSUER),
  authorization_endpoint: z.string().url(),
  token_endpoint: z.string().url(),
  userinfo_endpoint: z.string().url(),
});

const tokenResponseSchema = z.object({
  access_token: z.string().min(1),
  token_type: z.string().transform((value) => value.toLowerCase()).pipe(z.literal('bearer')),
  id_token: z.string().min(1),
});

const userInfoSchema = z.object({
  sub: z.string().min(1),
  email: z.string().email(),
  email_verified: z.boolean(),
  name: z.string().min(1),
});

const transactionSchema = z.object({
  purpose: z.literal('oidc-transaction'),
  state: z.string().min(1),
  nonce: z.string().min(1),
  codeVerifier: z.string().min(43).max(128),
  returnTo: z.string().min(1),
});

const sessionSchema = z.object({
  purpose: z.literal('hub-session'),
  issuer: z.literal(OIDC_ISSUER),
  subject: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  emailVerified: z.boolean(),
});

export interface HubAuthEnv {
  HUB_OIDC_CLIENT_SECRET?: string;
  HUB_SESSION_SECRET?: string;
}

export interface OidcTransaction {
  state: string;
  nonce: string;
  codeVerifier: string;
  returnTo: string;
}

export interface HubSession {
  issuer: typeof OIDC_ISSUER;
  subject: string;
  name: string;
  email: string;
  emailVerified: boolean;
  expiresAt: string;
}

type Fetch = typeof fetch;

export function readHubAuthEnv(locals: unknown): HubAuthEnv {
  const env: HubAuthEnv = {};

  if (typeof process !== 'undefined' && process.env) {
    copyHubAuthEnv(env, process.env);
  }

  if (locals && typeof locals === 'object') {
    const runtime = (locals as { runtime?: { env?: HubAuthEnv } }).runtime;
    copyHubAuthEnv(env, runtime?.env);
  }

  return env;
}

function copyHubAuthEnv(target: HubAuthEnv, source: HubAuthEnv | undefined) {
  if (source?.HUB_OIDC_CLIENT_SECRET) {
    target.HUB_OIDC_CLIENT_SECRET = source.HUB_OIDC_CLIENT_SECRET;
  }
  if (source?.HUB_SESSION_SECRET) {
    target.HUB_SESSION_SECRET = source.HUB_SESSION_SECRET;
  }
}

export function sanitizeReturnPath(value: string | null | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) {
    return '/';
  }

  if (/[\u0000-\u001f\u007f\\]/u.test(value)) return '/';

  try {
    const parsed = new URL(value, HUB_ORIGIN);
    if (parsed.origin !== HUB_ORIGIN) return '/';
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return '/';
  }
}

export async function beginOidcSignIn(
  request: Request,
  env: HubAuthEnv,
  fetchImpl: Fetch = fetch,
): Promise<Response> {
  let config: Required<HubAuthEnv>;
  try {
    config = requireConfig(env);
  } catch {
    return textResponse('Hub sign-in is not configured.', 503);
  }

  try {
    const discovery = await fetchDiscovery(fetchImpl);
    const requestUrl = new URL(request.url);
    const returnTo = sanitizeReturnPath(requestUrl.searchParams.get('returnTo'));
    const state = randomBase64Url(32);
    const nonce = randomBase64Url(32);
    const codeVerifier = randomBase64Url(32);
    const codeChallenge = await sha256Base64Url(codeVerifier);
    const transactionCookie = await sealCookie(
      {
        purpose: 'oidc-transaction',
        state,
        nonce,
        codeVerifier,
        returnTo,
      },
      'hub-oidc-transaction',
      config.HUB_SESSION_SECRET,
      TRANSACTION_TTL_SECONDS,
    );

    const authorizationUrl = new URL(discovery.authorization_endpoint);
    authorizationUrl.search = new URLSearchParams({
      client_id: OIDC_CLIENT_ID,
      redirect_uri: OIDC_CALLBACK_URL,
      response_type: 'code',
      response_mode: 'query',
      scope: 'openid profile email',
      state,
      nonce,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    }).toString();

    return new Response(null, {
      status: 302,
      headers: {
        'cache-control': 'no-store',
        location: authorizationUrl.toString(),
        'set-cookie': serializeCookie(
          HUB_AUTH_TRANSACTION_COOKIE,
          transactionCookie,
          TRANSACTION_TTL_SECONDS,
        ),
      },
    });
  } catch {
    return textResponse('Hub sign-in is temporarily unavailable.', 502);
  }
}

export async function finishOidcCallback(
  request: Request,
  env: HubAuthEnv,
  fetchImpl: Fetch = fetch,
): Promise<Response> {
  const requestUrl = new URL(request.url);
  const transaction = await readOidcTransaction(request.headers.get('cookie'), env);
  const state = requestUrl.searchParams.get('state');

  if (!transaction || !state || state !== transaction.state) {
    return callbackFailure();
  }

  if (requestUrl.searchParams.has('error')) {
    return callbackFailure(transaction.returnTo, 'cancelled');
  }

  const code = requestUrl.searchParams.get('code');
  if (!code) return callbackFailure();

  let config: Required<HubAuthEnv>;
  try {
    config = requireConfig(env);
  } catch {
    return callbackFailure();
  }

  try {
    const discovery = await fetchDiscovery(fetchImpl);
    const tokenResponse = await fetchImpl(discovery.token_endpoint, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Basic ${encodeClientCredentials(OIDC_CLIENT_ID, config.HUB_OIDC_CLIENT_SECRET)}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: OIDC_CALLBACK_URL,
        code_verifier: transaction.codeVerifier,
      }).toString(),
    });
    if (!tokenResponse.ok) throw new Error('Token exchange failed');
    const tokens = tokenResponseSchema.parse(await tokenResponse.json());

    const { payload } = await jwtVerify(
      tokens.id_token,
      new TextEncoder().encode(config.HUB_OIDC_CLIENT_SECRET),
      {
        algorithms: ['HS256'],
        issuer: OIDC_ISSUER,
        audience: OIDC_CLIENT_ID,
        clockTolerance: 60,
        maxTokenAge: '10m',
      },
    );
    if (!payload.sub || payload.nonce !== transaction.nonce) {
      throw new Error('ID token correlation failed');
    }

    const userInfoResponse = await fetchImpl(discovery.userinfo_endpoint, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${tokens.access_token}`,
      },
    });
    if (!userInfoResponse.ok) throw new Error('UserInfo request failed');
    const userInfo = userInfoSchema.parse(await userInfoResponse.json());
    if (userInfo.sub !== payload.sub) throw new Error('Identity subject mismatch');

    const sessionCookie = await sealCookie(
      {
        purpose: 'hub-session',
        issuer: OIDC_ISSUER,
        subject: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        emailVerified: userInfo.email_verified,
      },
      'hub-local-session',
      config.HUB_SESSION_SECRET,
      SESSION_TTL_SECONDS,
    );

    const response = redirectResponse(transaction.returnTo);
    response.headers.append(
      'set-cookie',
      serializeCookie(HUB_SESSION_COOKIE, sessionCookie, SESSION_TTL_SECONDS),
    );
    response.headers.append('set-cookie', clearCookie(HUB_AUTH_TRANSACTION_COOKIE));
    return response;
  } catch {
    return callbackFailure();
  }
}

export async function readOidcTransaction(
  cookieHeader: string | null,
  env: HubAuthEnv,
): Promise<OidcTransaction | null> {
  const value = readCookie(cookieHeader, HUB_AUTH_TRANSACTION_COOKIE);
  if (!value || !env.HUB_SESSION_SECRET) return null;

  try {
    const payload = await unsealCookie(value, 'hub-oidc-transaction', env.HUB_SESSION_SECRET);
    const transaction = transactionSchema.parse(payload);
    return {
      state: transaction.state,
      nonce: transaction.nonce,
      codeVerifier: transaction.codeVerifier,
      returnTo: sanitizeReturnPath(transaction.returnTo),
    };
  } catch {
    return null;
  }
}

export async function readHubSession(
  cookieHeader: string | null,
  env: HubAuthEnv,
): Promise<HubSession | null> {
  const value = readCookie(cookieHeader, HUB_SESSION_COOKIE);
  if (!value || !env.HUB_SESSION_SECRET) return null;

  try {
    const payload = await unsealCookie(value, 'hub-local-session', env.HUB_SESSION_SECRET);
    const session = sessionSchema.parse(payload);
    if (!payload.exp) return null;
    return {
      issuer: session.issuer,
      subject: session.subject,
      name: session.name,
      email: session.email,
      emailVerified: session.emailVerified,
      expiresAt: new Date(payload.exp * 1000).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function finishHubSignOut(request: Request): Promise<Response> {
  if (request.headers.get('origin') !== HUB_ORIGIN) {
    return textResponse('Forbidden', 403);
  }

  const response = redirectResponse('/');
  response.headers.append('set-cookie', clearCookie(HUB_SESSION_COOKIE));
  return response;
}

export function hubSessionResponse(session: HubSession | null): Response {
  return new Response(JSON.stringify({ session }), {
    status: 200,
    headers: {
      'cache-control': 'no-store',
      'content-type': 'application/json; charset=utf-8',
    },
  });
}

function requireConfig(env: HubAuthEnv): Required<HubAuthEnv> {
  if (!env.HUB_OIDC_CLIENT_SECRET || !env.HUB_SESSION_SECRET) {
    throw new Error('Hub auth secrets are not configured');
  }
  if (env.HUB_SESSION_SECRET.length < 32) {
    throw new Error('Hub session secret must contain at least 32 characters');
  }
  return {
    HUB_OIDC_CLIENT_SECRET: env.HUB_OIDC_CLIENT_SECRET,
    HUB_SESSION_SECRET: env.HUB_SESSION_SECRET,
  };
}

async function fetchDiscovery(fetchImpl: Fetch) {
  const response = await fetchImpl(OIDC_DISCOVERY_URL, {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) throw new Error('OIDC discovery failed');
  const discovery = discoverySchema.parse(await response.json());
  assertProviderEndpoint(discovery.authorization_endpoint);
  assertProviderEndpoint(discovery.token_endpoint);
  assertProviderEndpoint(discovery.userinfo_endpoint);
  return discovery;
}

function assertProviderEndpoint(value: string) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.origin !== OIDC_ISSUER || url.username || url.password) {
    throw new Error('OIDC endpoint is outside the pinned provider origin');
  }
}

async function sealCookie(
  payload: Record<string, unknown>,
  audience: string,
  secret: string,
  ttlSeconds: number,
) {
  const now = Math.floor(Date.now() / 1000);
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuer(HUB_ORIGIN)
    .setAudience(audience)
    .setIssuedAt(now)
    .setExpirationTime(now + ttlSeconds)
    .encrypt(await deriveEncryptionKey(secret));
}

async function unsealCookie(value: string, audience: string, secret: string) {
  const { payload } = await jwtDecrypt(value, await deriveEncryptionKey(secret), {
    issuer: HUB_ORIGIN,
    audience,
    keyManagementAlgorithms: ['dir'],
    contentEncryptionAlgorithms: ['A256GCM'],
    clockTolerance: 30,
  });
  return payload;
}

async function deriveEncryptionKey(secret: string) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret)));
}

function randomBase64Url(byteLength: number) {
  return base64Url(crypto.getRandomValues(new Uint8Array(byteLength)));
}

async function sha256Base64Url(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return base64Url(new Uint8Array(digest));
}

function base64Url(value: Uint8Array) {
  let binary = '';
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');
}

function encodeClientCredentials(clientId: string, clientSecret: string) {
  return btoa(`${encodeURIComponent(clientId)}:${encodeURIComponent(clientSecret)}`);
}

function readCookie(header: string | null, name: string) {
  if (!header) return null;
  for (const part of header.split(';')) {
    const separator = part.indexOf('=');
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() === name) return part.slice(separator + 1).trim();
  }
  return null;
}

function serializeCookie(name: string, value: string, maxAge: number) {
  return `${name}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

function clearCookie(name: string) {
  return `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

function redirectResponse(location: string) {
  return new Response(null, {
    status: 303,
    headers: {
      'cache-control': 'no-store',
      location,
    },
  });
}

function callbackFailure(returnTo = '/', reason = 'failed') {
  const destination = new URL(sanitizeReturnPath(returnTo), HUB_ORIGIN);
  destination.searchParams.set('auth', reason);
  const response = redirectResponse(`${destination.pathname}${destination.search}${destination.hash}`);
  response.headers.append('set-cookie', clearCookie(HUB_AUTH_TRANSACTION_COOKIE));
  return response;
}

function textResponse(message: string, status: number) {
  return new Response(message, {
    status,
    headers: {
      'cache-control': 'no-store',
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
