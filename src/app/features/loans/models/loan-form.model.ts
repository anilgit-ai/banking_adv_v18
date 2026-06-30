import { FormControl } from '@angular/forms';

import { LoanStatus } from '../enums/loan-status.enum';
import { LoanType } from '../enums/loan-type.enum';

/**
 * Loan reactive form model.
 */
export interface LoanForm {
  customerId: FormControl<string>;

  loanType: FormControl<LoanType>;

  principalAmount: FormControl<number>;

  interestRate: FormControl<number>;

  tenureMonths: FormControl<number>;

  emiAmount: FormControl<number>;

  startDate: FormControl<Date>;

  endDate: FormControl<Date>;

  outstandingBalance: FormControl<number>;

  status: FormControl<LoanStatus>;

  remarks: FormControl<string>;
}
