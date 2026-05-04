import type { Invoice } from '../../lib/agent-lab/types';

export const invoices: Invoice[] = [
  {
    id: 'inv_acme_1017',
    customerId: 'cust_acme',
    amount: 6400,
    dueDate: '2026-03-21',
    status: 'overdue',
    daysPastDue: 42,
  },
  {
    id: 'inv_acme_1034',
    customerId: 'cust_acme',
    amount: 11800,
    dueDate: '2026-05-18',
    status: 'open',
    daysPastDue: 0,
  },
  {
    id: 'inv_globex_2042',
    customerId: 'cust_globex',
    amount: 9000,
    dueDate: '2026-05-27',
    status: 'open',
    daysPastDue: 0,
  },
  {
    id: 'inv_initech_3031',
    customerId: 'cust_initech',
    amount: 7200,
    dueDate: '2026-02-14',
    status: 'overdue',
    daysPastDue: 77,
  },
];
