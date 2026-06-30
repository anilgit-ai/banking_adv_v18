
import { TransactionStatus } from '../enums/transaction-status.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export interface Transactions {
  id: string;
  transactionNumber: string;
  accountId: string;
  customerId: string;
  transactionType: TransactionType;
  amount: number;
  description: string;
  transactionDate: string;
  status: TransactionStatus;
  balanceAfterTransaction: number;
}
