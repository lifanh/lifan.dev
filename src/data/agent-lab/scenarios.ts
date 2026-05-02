import type { AgentScenario } from '../../lib/agent-lab/types';

export const scenarios: AgentScenario[] = [
  {
    id: 'acme-credit-review',
    title: 'ACME credit order review',
    customerNameOrId: 'ACME',
    orderAmount: 20000,
    currency: 'USD',
    userRequest: 'Can customer ACME place a new order for $20,000?',
    lesson: 'A realistic ERP credit check where the agent must inspect customer status, invoices, policy, and ask for approval before creating a business record.',
  },
  {
    id: 'globex-standard-order',
    title: 'Globex standard order',
    customerNameOrId: 'Globex',
    orderAmount: 10000,
    currency: 'USD',
    userRequest: 'Can Globex place a new order for $10,000?',
    lesson: 'A low-risk path where clean credit data allows the agent to complete without human approval.',
  },
  {
    id: 'initech-blocked-order',
    title: 'Initech blocked account',
    customerNameOrId: 'Initech',
    orderAmount: 5000,
    currency: 'USD',
    userRequest: 'Can Initech place a new order for $5,000?',
    lesson: 'A blocked-account path where policy and source data prevent the agent from recommending release.',
  },
];
