import type { Invoice } from '../../lib/agent-lab/types';

export const invoices: Invoice[] = [
  { id: 'inv_1001', customerId: 'cust_acme', amount: 12000, dueDate: '2026-03-21', status: 'overdue', daysPastDue: 42 },
  { id: 'inv_1002', customerId: 'cust_acme', amount: 8000, dueDate: '2026-04-20', status: 'open', daysPastDue: 0 },
  { id: 'inv_2001', customerId: 'cust_globex', amount: 5000, dueDate: '2026-04-28', status: 'open', daysPastDue: 0 },
  { id: 'inv_3001', customerId: 'cust_initech', amount: 10000, dueDate: '2026-02-10', status: 'overdue', daysPastDue: 80 },
];
