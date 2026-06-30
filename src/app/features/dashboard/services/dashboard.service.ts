import { Injectable, inject } from '@angular/core';

import { forkJoin, map, Observable } from 'rxjs';

import { CustomersService } from '../../customers/services/customers.service';
import { AccountsService } from '../../accounts/services/accounts.service';
import { TransactionsService } from '../../transactions/services/transactions.service';
import { DashboardViewModel } from '../models/dashboard-view.model';
import { Customer } from '../../customers/models/customer.model';
import { Account } from '../../accounts/models/account.model';
import { Transaction } from '../../transactions/models/transaction.model';



@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  /**
   * Customers Service.
   */
  private readonly customersService = inject(CustomersService);

  /**
   * Accounts Service.
   */
  private readonly accountsService = inject(AccountsService);

  /**
   * Transactions Service.
   */
  private readonly transactionsService = inject(TransactionsService);

  /**
   * Retrieves dashboard data.
   */
  public getDashboard(): Observable<DashboardViewModel> {
    return forkJoin({
      customers: this.customersService.getCustomers(),

      accounts: this.accountsService.getAccounts(),

      transactions: this.transactionsService.getTransactions(),
    }).pipe(
      map(({ customers, accounts, transactions }) =>
        this.buildDashboard(customers, accounts, transactions),
      ),
    );
  }

  /**
   * Builds dashboard view model.
   */
  /**
   * Builds dashboard view model.
   */
  private buildDashboard(
    customers: Customer[],
    accounts: Account[],
    transactions: Transaction[],
  ): DashboardViewModel {
    const totalCustomers = customers.length;
    const totalAccounts = accounts.length;
    const totalBalance = accounts.reduce(
      (sum, account) => sum + account.balance,
      0,
    );
    const recentTransactions = [...transactions]
      .sort(
        (a, b) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime(),
      )
      .slice(0, 5);
    return {
      totalCustomers,
      totalAccounts,
      totalBalance,
      activeLoans: 0,
      recentTransactions,
    };
  }
}
