import { TransactionStatus } from '../enums/transaction-status.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export const TRANSACTION_CONSTANTS = {
  TYPES: [
    {
      label: 'Credit',
      value: TransactionType.CREDIT,
    },
    {
      label: 'Debit',
      value: TransactionType.DEBIT,
    },
    {
      label: 'Transfer',
      value: TransactionType.TRANSFER,
    },
  ],

  STATUSES: [
    {
      label: 'Success',
      value: TransactionStatus.SUCCESS,
    },
    {
      label: 'Pending',
      value: TransactionStatus.PENDING,
    },
    {
      label: 'Failed',
      value: TransactionStatus.FAILED,
    },
  ],
} as const;
