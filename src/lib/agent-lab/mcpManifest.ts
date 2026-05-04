import { z } from 'zod';
import { evaluateToolPermission } from './policy';
import { toolArgsSchemas, type ToolName } from './schemas';

/**
 * mcpManifest.ts
 *
 * Lab 7 — MCP-style tool protocol.
 *
 * The Agent Lab already defines:
 *  - tool implementations (`mockTools.ts`)
 *  - argument schemas (`schemas.ts`)
 *  - a permission policy (`policy.ts`)
 *
 * Model Context Protocol takes those three pieces and exposes them
 * through a single, machine-readable manifest so any compatible client
 * can discover them at runtime. The point of this lab is to make that
 * derivation visible: nothing magic, just rendering the same metadata
 * the runner already consults.
 *
 * The manifest is generated locally; no MCP server is actually started.
 * Wiring this to a real MCP server (stdio or HTTP) is a small adapter
 * that consumes `listTools()` / `callTool(name, args)` from this module.
 */

const TOOL_DESCRIPTIONS: Record<ToolName, string> = {
  getCustomer: 'Resolve a customer name or id into the canonical customer record.',
  getCreditStatus: 'Return the current credit limit, exposure, available credit, status, and risk level.',
  getOpenInvoices: 'List all open and overdue invoices for a customer.',
  checkOrderEligibility: 'Compute whether a proposed order can be released given current credit and aging.',
  createCreditReviewTicket: 'Create a persistent credit-review ticket. Write action; always requires approval.',
};

export type McpPermissionLevel = 'read_only' | 'requires_approval' | 'requires_approval_when' | 'denied';

export type McpJsonSchema = {
  type: 'object';
  properties: Record<string, McpJsonSchemaProperty>;
  required: string[];
  additionalProperties: false;
};

export type McpJsonSchemaProperty =
  | { type: 'string'; description?: string; minLength?: number; maxLength?: number }
  | { type: 'integer' | 'number'; description?: string; minimum?: number; maximum?: number; exclusiveMinimum?: number };

export type McpToolDescriptor = {
  name: ToolName;
  description: string;
  inputSchema: McpJsonSchema;
  /**
   * The MCP spec leaves authorisation to the host. Surfacing the policy
   * decision in the manifest lets a client display "this tool always
   * needs approval" before the user even types a request.
   */
  permission: {
    level: McpPermissionLevel;
    explanation: string;
  };
};

export type McpManifest = {
  /** Echoes what an MCP `initialize` response carries. */
  protocolVersion: '2024-11-05';
  serverInfo: {
    name: 'agent-lab-mock-erp';
    version: '0.1.0';
  };
  capabilities: {
    tools: { listChanged: false };
  };
  tools: McpToolDescriptor[];
};

export function listTools(): McpToolDescriptor[] {
  return (Object.keys(toolArgsSchemas) as ToolName[]).map((name) => buildDescriptor(name));
}

export function getToolDescriptor(name: ToolName): McpToolDescriptor {
  return buildDescriptor(name);
}

export function buildManifest(): McpManifest {
  return {
    protocolVersion: '2024-11-05',
    serverInfo: { name: 'agent-lab-mock-erp', version: '0.1.0' },
    capabilities: { tools: { listChanged: false } },
    tools: listTools(),
  };
}

/**
 * A scripted MCP-style handshake the UI replays so the lab teacher can
 * walk through what an agent does on first contact:
 *  1. initialize  — negotiate protocol version + capabilities
 *  2. tools/list  — discover what the server exposes
 *  3. tools/call  — invoke one tool with structured args
 *
 * Only the first two are answered from this module; the third is just a
 * preview of the JSON envelope that a runner would post.
 */
export type McpHandshakeStep = {
  step: number;
  direction: 'client→server' | 'server→client';
  method: string;
  payload: unknown;
};

export function simulateMcpHandshake(toolName: ToolName, sampleArgs: Record<string, unknown>): McpHandshakeStep[] {
  const manifest = buildManifest();
  return [
    {
      step: 1,
      direction: 'client→server',
      method: 'initialize',
      payload: {
        protocolVersion: '2024-11-05',
        clientInfo: { name: 'agent-lab-runner', version: '0.1.0' },
        capabilities: {},
      },
    },
    {
      step: 2,
      direction: 'server→client',
      method: 'initialize/result',
      payload: {
        protocolVersion: manifest.protocolVersion,
        serverInfo: manifest.serverInfo,
        capabilities: manifest.capabilities,
      },
    },
    {
      step: 3,
      direction: 'client→server',
      method: 'tools/list',
      payload: {},
    },
    {
      step: 4,
      direction: 'server→client',
      method: 'tools/list/result',
      payload: {
        tools: manifest.tools.map((tool) => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        })),
      },
    },
    {
      step: 5,
      direction: 'client→server',
      method: 'tools/call',
      payload: {
        name: toolName,
        arguments: sampleArgs,
      },
    },
  ];
}

function buildDescriptor(name: ToolName): McpToolDescriptor {
  const schema = toolArgsSchemas[name];
  const inputSchema = zodObjectToJsonSchema(schema);
  return {
    name,
    description: TOOL_DESCRIPTIONS[name],
    inputSchema,
    permission: derivePermission(name, inputSchema),
  };
}

function derivePermission(
  name: ToolName,
  _inputSchema: McpJsonSchema,
): McpToolDescriptor['permission'] {
  // Probe the policy with empty args; arg-aware rules surface as
  // 'requires_approval_when' so the manifest can document the rule
  // even though the actual decision happens at call time.
  const probe = evaluateToolPermission(name, {});

  if (probe.decision === 'deny') {
    return { level: 'denied', explanation: probe.reason };
  }
  if (probe.decision === 'requires_approval') {
    return { level: 'requires_approval', explanation: probe.reason };
  }

  if (name === 'checkOrderEligibility') {
    return {
      level: 'requires_approval_when',
      explanation:
        'Read-only by default, but orders above $1,000,000 require human approval (large-order threshold).',
    };
  }

  return {
    level: 'read_only',
    explanation: 'Read-only data lookup. Safe to call without approval.',
  };
}

// --- Tiny zod → JSON schema converter -------------------------------------
//
// We deliberately do not pull in `zod-to-json-schema` to keep the deps
// tight. The Agent Lab schemas are uniformly z.object with z.string and
// z.number leaves; everything we need fits in ~30 lines and stays
// pedagogically transparent.

export function zodObjectToJsonSchema(schema: z.ZodObject<z.ZodRawShape>): McpJsonSchema {
  const properties: Record<string, McpJsonSchemaProperty> = {};
  const required: string[] = [];

  const shape = schema.shape;
  for (const [key, value] of Object.entries(shape)) {
    const fieldSchema = value as z.ZodTypeAny;
    properties[key] = leafToJsonSchema(fieldSchema);
    if (!fieldSchema.isOptional()) {
      required.push(key);
    }
  }

  return {
    type: 'object',
    properties,
    required,
    additionalProperties: false,
  };
}

function leafToJsonSchema(schema: z.ZodTypeAny): McpJsonSchemaProperty {
  const def: { typeName?: string; checks?: Array<Record<string, unknown>> } =
    (schema as unknown as { _def: { typeName?: string; checks?: Array<Record<string, unknown>> } })._def;
  const typeName = def.typeName;
  const checks = def.checks ?? [];

  if (typeName === 'ZodString') {
    const out: McpJsonSchemaProperty = { type: 'string' };
    for (const check of checks) {
      if (check.kind === 'min') out.minLength = check.value as number;
      if (check.kind === 'max') out.maxLength = check.value as number;
    }
    return out;
  }

  if (typeName === 'ZodNumber') {
    let isInteger = false;
    let minimum: number | undefined;
    let maximum: number | undefined;
    let exclusiveMinimum: number | undefined;
    for (const check of checks) {
      if (check.kind === 'int') isInteger = true;
      if (check.kind === 'min') {
        if (check.inclusive === false) {
          exclusiveMinimum = check.value as number;
        } else {
          minimum = check.value as number;
        }
      }
      if (check.kind === 'max') maximum = check.value as number;
    }
    const out: McpJsonSchemaProperty = { type: isInteger ? 'integer' : 'number' };
    if (minimum !== undefined) out.minimum = minimum;
    if (maximum !== undefined) out.maximum = maximum;
    if (exclusiveMinimum !== undefined) out.exclusiveMinimum = exclusiveMinimum;
    return out;
  }

  // Fallback for any unknown leaf — should not happen for the lab's
  // current schemas but keeps the converter total.
  return { type: 'string' };
}
