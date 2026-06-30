import { Loan } from './loan.model';

export type CreateLoan = Omit<Loan, 'id'>;
