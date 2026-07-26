import type { APIRoute } from 'astro';

import { beginOidcSignIn, readHubAuthEnv } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = ({ request, locals }) =>
  beginOidcSignIn(request, readHubAuthEnv(locals));
