import { Loan } from './loan.model';

export interface LoanView extends Loan {
  
  customerName: string;
}
