import type { Scenario } from '../../lib/agent-lab/types';

export const scenarios: Scenario[] = [
  {
    id: 'scn_acme_20k',
    title: 'ACME credit order eligibility',
    customerName: 'ACME',
    orderAmount: 20000,
    userPrompt: 'Can customer ACME place a new order for $20,000?',
  },
  {
    id: 'scn_globex_5k',
    title: 'Globex small order',
    customerName: 'Globex',
    orderAmount: 5000,
    userPrompt: 'Can Globex place a new order for $5,000?',
  },
  {
    id: 'scn_initech_4k',
    title: 'Initech blocked account',
    customerName: 'Initech',
    orderAmount: 4000,
    userPrompt: 'Can Initech place a new order for $4,000?',
  },
];
