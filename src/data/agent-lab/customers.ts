import type { Customer } from '../../lib/agent-lab/types';

export const customers: Customer[] = [
  {
    id: 'cust_acme',
    name: 'ACME Corp',
    creditLimit: 50000,
    currentExposure: 38000,
    paymentTerms: 'Net 30',
    riskLevel: 'medium',
    accountStatus: 'watchlist',
  },
  {
    id: 'cust_globex',
    name: 'Globex',
    creditLimit: 120000,
    currentExposure: 22000,
    paymentTerms: 'Net 30',
    riskLevel: 'low',
    accountStatus: 'active',
  },
  {
    id: 'cust_initech',
    name: 'Initech',
    creditLimit: 25000,
    currentExposure: 19000,
    paymentTerms: 'Prepay',
    riskLevel: 'high',
    accountStatus: 'blocked',
  },
];
