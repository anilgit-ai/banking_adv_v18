import { LoanStatus } from '../enums/loan-status.enum';
import { LoanType } from '../enums/loan-type.enum';

export interface Loan {
  /**
   * Loan identifier.
   */
  id: string;

  /**
   * Loan number.
   */
  loanNumber: string;

  /**
   * Customer identifier.
   */
  customerId: string;

  /**
   * Loan type.
   */
  loanType: LoanType;

  /**
   * Principal amount.
   */
  principalAmount: number;

  /**
   * Annual interest rate.
   */
  interestRate: number;

  /**
   * Loan tenure in months.
   */
  tenureMonths: number;

  /**
   * Monthly EMI amount.
   */
  emiAmount: number;

  /**
   * Loan start date.
   */
  startDate: string;

  /**
   * Loan end date.
   */
  endDate: string;

  /**
   * Outstanding balance.
   */
  outstandingBalance: number;

  /**
   * Loan status.
   */
  status: LoanStatus;

  /**
   * Additional remarks.
   */
  remarks: string;
}
