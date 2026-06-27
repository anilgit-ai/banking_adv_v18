import { Routes } from '@angular/router';

import { AccountsListComponent } from './pages/accounts-list/accounts-list.component';

export const ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    component: AccountsListComponent,
    title: 'Accounts',
  },
];
