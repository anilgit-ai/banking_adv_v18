import { Routes } from '@angular/router';

import { AccountsListComponent } from './pages/accounts-list/accounts-list.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';

export const ACCOUNTS_ROUTES: Routes = [
  /**
   * Accounts List
   */
  {
    path: '',
    component: AccountsListComponent,
    title: 'Accounts',
  },

  /**
   * Create Account
   */
  {
    path: 'new',
    component: CreateAccountComponent,
    title: 'Create Account',
  },

  /**
   * Edit Account
   */
  {
    path: ':id/edit',
    component: EditAccountComponent,
    title: 'Edit Account',
  },

  /**
   * Account Details
   */
  {
    path: ':id',
    component: AccountDetailsComponent,
    title: 'Account Details',
  },
];
