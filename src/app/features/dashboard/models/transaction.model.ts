export enum TransactionType {
  CREDIT = 'CREDIT',

  DEBIT = 'DEBIT',
}

/**
 * Represents a banking transaction.
 */
export interface Transaction {
  readonly id: string;

  readonly referenceNumber: string;

  readonly transactionDate: string;

  readonly description: string;

  readonly type: TransactionType;

  readonly amount: number;
}
