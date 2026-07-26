import { describe, expect, it } from 'vitest';
import { hubCatalogSections } from './hubCatalog';

const items = hubCatalogSections.flatMap((section) => section.items);

describe('hubCatalogSections', () => {
  it('keeps catalog identifiers and destinations unique', () => {
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    expect(new Set(items.map((item) => item.href)).size).toBe(items.length);
  });

  it('preserves the canonical routes for hub-native tools', () => {
    const internalRoutes = items
      .filter((item) => !item.external)
      .map((item) => item.href)
      .sort();

    expect(internalRoutes).toEqual([
      '/tools/accounting-intro',
      '/tools/agent-lab/labs',
      '/tools/economic-sim',
      '/tools/philosophy-intro',
    ]);
  });

  it('uses the production origins for standalone apps', () => {
    const externalOrigins = Object.fromEntries(
      items
        .filter((item) => item.external)
        .map((item) => [item.id, new URL(item.href).origin]),
    );

    expect(externalOrigins).toEqual({
      'another-podcast': 'https://podcasts.lifan.dev',
      'grow-wise': 'https://grow-wise.lifan.dev',
    });
  });
});
