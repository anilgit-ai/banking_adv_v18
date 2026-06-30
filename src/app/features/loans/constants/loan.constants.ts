import { LoanStatus } from '../enums/loan-status.enum';
import { LoanType } from '../enums/loan-type.enum';

export const LOAN_CONSTANTS = {
  /**
   * Loan Types.
   */
  TYPES: [
    {
      label: 'Home Loan',
      value: LoanType.HOME,
    },

    {
      label: 'Personal Loan',
      value: LoanType.PERSONAL,
    },

    {
      label: 'Vehicle Loan',
      value: LoanType.VEHICLE,
    },

    {
      label: 'Education Loan',
      value: LoanType.EDUCATION,
    },

    {
      label: 'Business Loan',
      value: LoanType.BUSINESS,
    },

    {
      label: 'Gold Loan',
      value: LoanType.GOLD,
    },
  ],

  /**
   * Loan Statuses.
   */
  STATUSES: [
    {
      label: 'Pending',
      value: LoanStatus.PENDING,
    },

    {
      label: 'Approved',
      value: LoanStatus.APPROVED,
    },

    {
      label: 'Active',
      value: LoanStatus.ACTIVE,
    },

    {
      label: 'Closed',
      value: LoanStatus.CLOSED,
    },

    {
      label: 'Rejected',
      value: LoanStatus.REJECTED,
    },
  ],

  /**
   * Validation Rules.
   */
  VALIDATION: {
    MIN_AMOUNT: 1000,

    MAX_AMOUNT: 100000000,

    MIN_INTEREST_RATE: 1,

    MAX_INTEREST_RATE: 25,

    MIN_TENURE: 1,

    MAX_TENURE: 360,

    MAX_REMARKS_LENGTH: 500,
  },
} as const;