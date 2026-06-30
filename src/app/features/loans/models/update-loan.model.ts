import { Loan } from './loan.model';

export type UpdateLoan = Omit<Loan, 'id'>;
