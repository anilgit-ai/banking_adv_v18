import { Transaction } from './transaction.model';

export interface TransactionView extends Transaction {
  accountNumber: string;
  customerName: string;
}
