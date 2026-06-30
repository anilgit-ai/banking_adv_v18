import { Routes } from '@angular/router';

import { ROUTES } from './core/constants/routes.constants';

import { AuthLayoutComponent } from './layout/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/layouts/main-layout/main-layout.component';

export const appRoutes: Routes = [
  // Authentication Area
  {
    path: `${ROUTES.ROOT}/${ROUTES.AUTH.ROOT}`,

    component: AuthLayoutComponent,

    children: [
      {
        path: ROUTES.AUTH.LOGIN,

        loadChildren: () =>
          import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },

  // Protected Area
  {
    path: ROUTES.ROOT,

    component: MainLayoutComponent,

    children: [
      {
        path: ROUTES.APP.DASHBOARD,

        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES,
          ),
      },

      {
        path: ROUTES.APP.ACCOUNTS,

        loadChildren: () =>
          import('./features/accounts/accounts.routes').then(
            (m) => m.ACCOUNTS_ROUTES,
          ),
      },
      {
        path: ROUTES.APP.CUSTOMERS,

        loadChildren: () =>
          import('./features/customers/customers.routes').then(
            (m) => m.CUSTOMERS_ROUTES,
          ),
      },
      {
        path: ROUTES.APP.TRANSACTIONS,
        loadChildren: () =>
          import('./features/transactions/transaction.routes').then(
            (m) => m.TRANSACTIONS_ROUTES,
          ),
      },
    ],
  },

  {
    path: '',
    redirectTo: `${ROUTES.ROOT}/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGIN}`,
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: `${ROUTES.ROOT}/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGIN}`,
  },
];
