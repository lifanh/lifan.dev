import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  buildManifest,
  getToolDescriptor,
  listTools,
  simulateMcpHandshake,
  zodObjectToJsonSchema,
} from './mcpManifest';

describe('zodObjectToJsonSchema', () => {
  it('converts string fields with min/max into JSON schema', () => {
    const schema = z.object({ name: z.string().min(1).max(64) });
    const json = zodObjectToJsonSchema(schema);
    expect(json).toEqual({
      type: 'object',
      properties: { name: { type: 'string', minLength: 1, maxLength: 64 } },
      required: ['name'],
      additionalProperties: false,
    });
  });

  it('marks integer fields as integer with minimum/maximum', () => {
    const schema = z.object({ amount: z.number().int().positive().max(1000) });
    const json = zodObjectToJsonSchema(schema);
    expect(json.properties.amount).toMatchObject({ type: 'integer', maximum: 1000 });
    // .positive() = exclusiveMinimum 0 in zod 3.x
    expect(
      'minimum' in json.properties.amount || 'exclusiveMinimum' in json.properties.amount,
    ).toBe(true);
  });
});

describe('listTools / getToolDescriptor', () => {
  it('lists every registered tool exactly once', () => {
    const tools = listTools();
    const names = tools.map((tool) => tool.name);
    expect(names).toContain('getCustomer');
    expect(names).toContain('getCreditStatus');
    expect(names).toContain('getOpenInvoices');
    expect(names).toContain('checkOrderEligibility');
    expect(names).toContain('createCreditReviewTicket');
    expect(new Set(names).size).toBe(names.length);
  });

  it('marks createCreditReviewTicket as requires_approval', () => {
    const descriptor = getToolDescriptor('createCreditReviewTicket');
    expect(descriptor.permission.level).toBe('requires_approval');
    expect(descriptor.permission.explanation).toMatch(/persistent/i);
  });

  it('marks checkOrderEligibility as requires_approval_when (arg-aware rule)', () => {
    const descriptor = getToolDescriptor('checkOrderEligibility');
    expect(descriptor.permission.level).toBe('requires_approval_when');
    expect(descriptor.permission.explanation).toMatch(/large-order/);
  });

  it('marks read-only lookups as read_only', () => {
    expect(getToolDescriptor('getCustomer').permission.level).toBe('read_only');
    expect(getToolDescriptor('getCreditStatus').permission.level).toBe('read_only');
    expect(getToolDescriptor('getOpenInvoices').permission.level).toBe('read_only');
  });

  it('produces an object schema with required fields for each tool', () => {
    for (const tool of listTools()) {
      expect(tool.inputSchema.type).toBe('object');
      expect(tool.inputSchema.required.length).toBeGreaterThan(0);
      expect(tool.inputSchema.additionalProperties).toBe(false);
    }
  });
});

describe('buildManifest', () => {
  it('returns an MCP-shaped manifest envelope', () => {
    const manifest = buildManifest();
    expect(manifest.protocolVersion).toBe('2024-11-05');
    expect(manifest.serverInfo.name).toBe('agent-lab-mock-erp');
    expect(manifest.capabilities.tools.listChanged).toBe(false);
    expect(manifest.tools.length).toBeGreaterThan(0);
  });
});

describe('simulateMcpHandshake', () => {
  it('produces an initialize → tools/list → tools/call script', () => {
    const steps = simulateMcpHandshake('getCustomer', { customerNameOrId: 'ACME' });
    expect(steps[0]?.method).toBe('initialize');
    expect(steps[1]?.method).toBe('initialize/result');
    expect(steps[2]?.method).toBe('tools/list');
    expect(steps[3]?.method).toBe('tools/list/result');
    expect(steps[4]?.method).toBe('tools/call');
    expect(steps[4]?.payload).toMatchObject({
      name: 'getCustomer',
      arguments: { customerNameOrId: 'ACME' },
    });
  });
});
