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
    creditLimit: 100000,
    currentExposure: 22000,
    paymentTerms: 'Net 45',
    riskLevel: 'low',
    accountStatus: 'active',
  },
  {
    id: 'cust_initech',
    name: 'Initech',
    creditLimit: 30000,
    currentExposure: 28000,
    paymentTerms: 'Net 15',
    riskLevel: 'high',
    accountStatus: 'blocked',
  },
];
