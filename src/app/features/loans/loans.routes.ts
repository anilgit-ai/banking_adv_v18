import { Routes } from '@angular/router';
import { LoansListComponent } from './pages/loans-list/loans-list.component';
import { CreateLoanComponent } from './pages/create-loan/create-loan.component';

export const LOANS_ROUTES: Routes = [
  {
    path: '',
    title: 'Loans List | Banking Management',
    component: LoansListComponent,
  },
  {
    path: 'new',
    title: 'New Loan | Banking Management',
    component: CreateLoanComponent,
  },
];
