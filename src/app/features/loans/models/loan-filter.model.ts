import { LoanStatus } from '../enums/loan-status.enum';
import { LoanType } from '../enums/loan-type.enum';
/**
 * Loan filter model.
 */
export interface LoanFilter {
  /**
   * Search text.
   */
  search: string;
  /**
   * Customer identifier.
   */
  customerId: string | null;
  /**
   * Loan type.
   */
  loanType: LoanType | null;
  /**
   * Loan status.
   */
  status: LoanStatus | null ;
}
