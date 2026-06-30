import { Routes } from '@angular/router';
import { TransactionsListComponent } from './pages/transactions-list/transactions-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

export const TRANSACTIONS_ROUTES: Routes = [
  {
    path: '',
    title: 'Transactions | Banking Management',
    component: TransactionsListComponent,
  },
  // New Transaction
  {
    path: 'new',
    title: 'New Transaction | Banking Management',
    loadComponent: () =>
      import('./pages/create-transaction/create-transaction.component').then(
        (c) => c.CreateTransactionComponent,
      ),
  },
  {
    path: ':id',
    title: 'Transaction Details | Banking Management',
    loadComponent: () =>
      import('./pages/transaction-details/transaction-details.component').then(
        (c) => c.TransactionDetailsComponent,
      ),
  },
  {
    path: ':id/edit',
    title: 'Edit Transaction | Banking Management',
    loadComponent: () =>
      import('./pages/edit-transaction/edit-transaction.component').then(
        (c) => c.EditTransactionComponent,
      ),
  },
];
