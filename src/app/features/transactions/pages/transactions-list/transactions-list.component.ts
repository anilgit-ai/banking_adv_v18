import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { forkJoin } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { TransactionsService } from '../../services/transactions.service';
import { AccountsService } from '../../../accounts/services/accounts.service';
import { NotificationService } from '../../../../shared/toast/services/notification.service';
import { Transaction } from '../../models/transaction.model';
import { Account } from '../../../accounts/models/account.model';
import { Customer } from '../../../customers/models/customer.model';
import { TransactionFiltersComponent } from '../../components/transaction-filters/transaction-filters.component';
import { TransactionTableComponent } from '../../components/transaction-table/transaction-table.component';
import { CustomersService } from '../../../customers/services/customers.service';
import { TransactionView } from '../../models/transaction-view.model';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TransactionFiltersComponent,
    TransactionTableComponent,
  ],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsListComponent implements OnInit {
  /**
   * Transactions Service.
   */
  private readonly transactionsService = inject(TransactionsService);

  /**
   * Accounts Service.
   */
  private readonly accountsService = inject(AccountsService);

  /**
   * Customers Service.
   */
  private readonly customersService = inject(CustomersService);

  /**
   * Router.
   */
  private readonly router = inject(Router);

  /**
   * Confirmation Service.
   */
  private readonly confirmationService = inject(ConfirmationService);

  /**
   * Notification Service.
   */
  private readonly notificationService = inject(NotificationService);

  /**
   * Transactions.
   */
  protected readonly transactions = signal<TransactionView[]>([]);

  /**
   * Original Transactions.
   */
  private readonly allTransactions = signal<TransactionView[]>([]);

  /**
   * Search keyword.
   */
  protected readonly searchKeyword = signal('');

  /**
   * Selected Type.
   */
  protected readonly selectedType = signal('');

  /**
   * Selected Status.
   */
  protected readonly selectedStatus = signal('');

  /**
   * Loading.
   */
  protected readonly loading = signal(false);

  /**
   * Error.
   */
  protected readonly hasError = signal(false);

  /**
   * Initialization.
   */
  ngOnInit(): void {
    this.loadTransactions();
  }

  /**
   * Loads transactions.
   */
  private loadTransactions(): void {
    this.loading.set(true);

    this.hasError.set(false);

    forkJoin({
      transactions: this.transactionsService.getTransactions(),

      accounts: this.accountsService.getAccounts(),

      customers: this.customersService.getCustomers(),
    }).subscribe({
      next: ({ transactions, accounts, customers }) => {
        const data = this.mapTransactions(transactions, accounts, customers);

        this.transactions.set(data);

        this.allTransactions.set(data);

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
   * Maps account and customer
   * information into transactions.
   */
  private mapTransactions(
    transactions: Transaction[],
    accounts: Account[],
    customers: Customer[],
  ): TransactionView[] {
    return transactions.map((transaction) => ({
      ...transaction,

      accountNumber:
        accounts.find((account) => account.id === transaction.accountId)
          ?.accountNumber ?? '-',

      customerName:
        customers.find((customer) => customer.id === transaction.customerId)
          ?.fullName ?? '-',
    }));
  }
  /**
   * Applies search and filters.
   */
  protected applyFilters(): void {
    const keyword = this.searchKeyword().trim().toLowerCase();

    const filtered = this.allTransactions().filter((transaction) => {
      const matchesSearch =
        !keyword ||
        transaction.transactionNumber.toLowerCase().includes(keyword) ||
        transaction.accountNumber.toLowerCase().includes(keyword) ||
        transaction.customerName.toLowerCase().includes(keyword) ||
        transaction.description.toLowerCase().includes(keyword);
      const matchesType =
        !this.selectedType() ||
        transaction.transactionType === this.selectedType();
      const matchesStatus =
        !this.selectedStatus() || transaction.status === this.selectedStatus();
      return matchesSearch && matchesType && matchesStatus;
    });
    this.transactions.set(filtered);
  }
  /**
   * Clears all filters.
   */
  protected clearFilters(): void {
    this.searchKeyword.set('');
    this.selectedType.set('');
    this.selectedStatus.set('');
    this.transactions.set(this.allTransactions());
  }
  /**
   * Navigates to Create Transaction page.
   */
  protected createTransaction(): void {
    this.router.navigate(['/app/transactions/new']);
  }

  /**
   * Deletes a transaction.
   */
  protected deleteTransaction(id: string): void {
    this.confirmationService.confirm({
      header: 'Delete Transaction',

      message: 'Are you sure you want to delete this transaction?',

      icon: 'pi pi-exclamation-triangle',

      acceptLabel: 'Delete',

      rejectLabel: 'Cancel',

      acceptButtonStyleClass: 'p-button-danger',

      accept: () => {
        this.transactionsService.deleteTransaction(id).subscribe({
          next: () => {
            this.notificationService.successDelete();

            this.loadTransactions();
          },

          error: () => {
            this.notificationService.deleteError();
          },
        });
      },

      reject: () => {
        this.notificationService.info(
          'Transaction deletion cancelled.',
          'Cancelled',
        );
      },
    });
  }
}
