import type { APIRoute } from 'astro';

import { hubSessionResponse, readHubAuthEnv, readHubSession } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const session = await readHubSession(request.headers.get('cookie'), readHubAuthEnv(locals));
  return hubSessionResponse(session);
};
