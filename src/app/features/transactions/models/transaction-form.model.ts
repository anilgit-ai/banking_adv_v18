import { FormControl } from '@angular/forms';

import { TransactionStatus } from '../enums/transaction-status.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export interface TransactionForm {
  accountId: FormControl<string>;
  customerId: FormControl<string>;
  transactionType: FormControl<TransactionType>;
  amount: FormControl<number>;
  description: FormControl<string>;
  transactionDate: FormControl<Date>;
  status: FormControl<TransactionStatus>;
  balanceAfterTransaction: FormControl<number>;
}
