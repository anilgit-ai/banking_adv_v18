import { Routes } from '@angular/router';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    title: 'Customers | Banking Mangement',
    loadComponent: () =>
      import('./pages/customers-list/customers-list.component').then(
        (c) => c.CustomersListComponent,
      ),
  },
  {
    path: 'new',
    title: 'Create Customer',

    loadComponent: () =>
      import('./pages/create-customer/create-customer.component').then(
        (c) => c.CreateCustomerComponent,
      ),
  },
  {
    path: ':id',
    title: 'Customer Details',
    loadComponent: () =>
      import('./pages/customer-details/customer-details.component').then(
        (c) => c.CustomerDetailsComponent,
      ),
  },
  {
    path: ':id/edit',
    title: 'Edit Customer',
    loadComponent: () =>
      import('./pages/edit-customer/edit-customer.component').then(
        (c) => c.EditCustomerComponent,
      ),
  },
];
