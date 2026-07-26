import type { APIRoute } from 'astro';

import { finishHubSignOut } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = ({ request }) => finishHubSignOut(request);
