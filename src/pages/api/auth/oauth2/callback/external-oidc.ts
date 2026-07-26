import type { APIRoute } from 'astro';

import { finishOidcCallback, readHubAuthEnv } from '../../../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = ({ request, locals }) =>
  finishOidcCallback(request, readHubAuthEnv(locals));
