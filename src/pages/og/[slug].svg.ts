import type { APIRoute } from 'astro';

interface OgEntry {
  title: string;
  subtitle: string;
}

const OG_ENTRIES: Record<string, OgEntry> = {
  home: {
    title: 'Lifan Dev',
    subtitle: 'Personal developer tools & interactive learning',
  },
  'philosophy-intro': {
    title: 'Introduction to Philosophy',
    subtitle: 'Interactive lessons from the Pre-Socratics onward',
  },
  'accounting-intro': {
    title: 'Accounting Fundamentals',
    subtitle: 'Learn accounting with interactive lessons & calculators',
  },
  'agent-lab': {
    title: 'Agent Engineering Lab',
    subtitle: 'Twelve focused labs on production AI agent engineering',
  },
  'economic-sim': {
    title: 'Economic Concept Visualizer',
    subtitle: 'Interactive supply & demand simulation',
  },
  changelog: {
    title: 'Changelog',
    subtitle: "What's new in Lifan Dev",
  },
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderOgSvg({ title, subtitle }: OgEntry): string {
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="250" width="64" height="6" rx="3" fill="#3b82f6"/>
  <text x="80" y="150" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="6" fill="#94a3b8">LIFAN DEV</text>
  <text x="80" y="360" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="68" font-weight="700" fill="#f8fafc">${safeTitle}</text>
  <text x="80" y="430" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="32" font-weight="400" fill="#cbd5e1">${safeSubtitle}</text>
  <g fill="#334155">
    <circle cx="980" cy="500" r="6"/>
    <circle cx="1010" cy="500" r="6"/>
    <circle cx="1040" cy="500" r="6"/>
    <circle cx="1070" cy="500" r="6"/>
    <circle cx="1100" cy="500" r="6"/>
  </g>
  <circle cx="1040" cy="500" r="6" fill="#3b82f6"/>
</svg>`;
}

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug ?? 'home';
  const entry = OG_ENTRIES[slug] ?? OG_ENTRIES.home;

  return new Response(renderOgSvg(entry), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
