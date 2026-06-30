import { TransactionType } from '../../../shared/enums/transaction-type.enum';

export interface Transaction {
  readonly id: string;

  readonly referenceNumber: string;

  readonly transactionDate: string;

  readonly description: string;

  readonly type: TransactionType;

  readonly amount: number;
}
