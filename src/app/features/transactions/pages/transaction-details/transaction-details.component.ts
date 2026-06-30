import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { forkJoin } from 'rxjs';

import { TransactionsService } from '../../services/transactions.service';
import { CustomersService } from '../../../customers/services/customers.service';
import { AccountsService } from '../../../accounts/services/accounts.service';

import { NotificationService } from '../../../../shared/toast/services/notification.service';

import { Transaction } from '../../models/transaction.model';
import { Customer } from '../../../customers/models/customer.model';
import { Account } from '../../../accounts/models/account.model';

import { TransactionStatus } from '../../enums/transaction-status.enum';

@Component({
  selector: 'app-transaction-details',

  standalone: true,

  imports: [CommonModule, RouterLink, ButtonModule, TagModule],

  templateUrl: './transaction-details.component.html',

  styleUrl: './transaction-details.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDetailsComponent implements OnInit {
  /**
   * Activated Route.
   */
  private readonly route = inject(ActivatedRoute);

  /**
   * Router.
   */
  private readonly router = inject(Router);

  /**
   * Transactions Service.
   */
  private readonly transactionsService = inject(TransactionsService);

  /**
   * Customers Service.
   */
  private readonly customersService = inject(CustomersService);

  /**
   * Accounts Service.
   */
  private readonly accountsService = inject(AccountsService);

  /**
   * Notification Service.
   */
  private readonly notificationService = inject(NotificationService);

  /**
   * Transaction.
   */
  protected readonly transaction = signal<Transaction | null>(null);

  /**
   * Customer.
   */
  protected readonly customer = signal<Customer | null>(null);

  /**
   * Account.
   */
  protected readonly account = signal<Account | null>(null);

  /**
   * Loading state.
   */
  protected readonly loading = signal(true);

  /**
   * Error state.
   */
  protected readonly hasError = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/app/transactions']);

      return;
    }

    this.loadTransaction(id);
  }

  /**
   * Loads transaction.
   */
  private loadTransaction(id: string): void {
    this.loading.set(true);

    this.hasError.set(false);

    this.transactionsService.getTransactionById(id).subscribe({
      next: (transaction) => {
        this.transaction.set(transaction);

        this.loadRelatedData(transaction.customerId, transaction.accountId);
      },

      error: () => {
        this.loading.set(false);

        this.hasError.set(true);

        this.notificationService.loadError();
      },
    });
  }

  /**
   * Loads customer
   * and account.
   */
  private loadRelatedData(customerId: string, accountId: string): void {
    forkJoin({
      customer: this.customersService.getCustomerById(customerId),

      account: this.accountsService.getAccountById(accountId),
    }).subscribe({
      next: ({ customer, account }) => {
        this.customer.set(customer);

        this.account.set(account);

        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);

        this.hasError.set(true);

        this.notificationService.loadError();
      },
    });
  }

  /**
   * Returns status severity.
   */
  protected getStatusSeverity(
    status: TransactionStatus,
  ): 'success' | 'warn' | 'danger' {
    switch (status) {
      case TransactionStatus.SUCCESS:
        return 'success';

      case TransactionStatus.PENDING:
        return 'warn';

      case TransactionStatus.FAILED:
        return 'danger';

      default:
        return 'warn';
    }
  }

  /**
   * Back to Transactions.
   */
  protected goBack(): void {
    this.router.navigate(['/app/transactions']);
  }
}
