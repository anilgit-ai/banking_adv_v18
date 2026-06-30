import { Transaction } from './transaction.model';

export type CreateTransaction = Omit<Transaction, 'id'>;
