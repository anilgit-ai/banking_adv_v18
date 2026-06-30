import { Transaction } from './transaction.model';

export type UpdateTransaction = Omit<Transaction, 'id'>;
