import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { forkJoin } from 'rxjs';

import { AccountsService } from '../../../accounts/services/accounts.service';
import { TransactionsService } from '../../services/transactions.service';

import { NotificationService } from '../../../../shared/toast/services/notification.service';

import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';

import { Customer } from '../../../customers/models/customer.model';
import { Account } from '../../../accounts/models/account.model';

import { TransactionStatus } from '../../enums/transaction-status.enum';
import { TransactionType } from '../../enums/transaction-type.enum';
import { CustomersService } from '../../../customers/services/customers.service';
import { CreateTransaction } from '../../models/create-transaction.model';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-create-transaction',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TransactionFormComponent,
  ],

  templateUrl: './create-transaction.component.html',

  styleUrl: './create-transaction.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTransactionComponent implements OnInit {
  /**
   * Form Builder.
   */
  private readonly fb = inject(FormBuilder);

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
   * Router.
   */
  private readonly router = inject(Router);

  /**
   * Notification Service.
   */
  private readonly notificationService = inject(NotificationService);

  /**
   * Customers.
   */
  protected readonly customers = signal<Customer[]>([]);

  /**
   * Accounts.
   */
  protected readonly accounts = signal<Account[]>([]);

  /**
   * Saving state.
   */
  protected readonly saving = signal(false);

  /**
   * Loading state.
   */
  protected readonly loading = signal(true);

  /**
   * Transaction Form.
   */
  protected readonly transactionForm = this.fb.nonNullable.group({
    customerId: ['', Validators.required],

    accountId: ['', Validators.required],

    transactionType: [TransactionType.CREDIT, Validators.required],

    amount: [0, [Validators.required, Validators.min(1)]],

    description: ['', Validators.required],

    transactionDate: [new Date(), Validators.required],

    status: [TransactionStatus.SUCCESS, Validators.required],

    balanceAfterTransaction: [0],
  });

  /**
   * Component initialization.
   */
  ngOnInit(): void {
    this.loadInitialData();
  }

  /**
   * Loads customers and accounts.
   */
  private loadInitialData(): void {
    this.loading.set(true);

    forkJoin({
      customers: this.customersService.getCustomers(),

      accounts: this.accountsService.getAccounts(),
    }).subscribe({
      next: ({ customers, accounts }) => {
        this.customers.set(customers);

        this.accounts.set(accounts);

        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);

        this.notificationService.loadError();

        this.router.navigate(['/app/transactions']);
      },
    });
  }
  /**
   * Creates a transaction.
   */
  protected createTransaction(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();

      return;
    }

    this.saving.set(true);

    this.transactionsService.getTransactions().subscribe({
      next: (transactions) => {
        const formValue = this.transactionForm.getRawValue();

        const selectedAccount = this.accounts().find(
          (account) => account.id === formValue.accountId,
        );

        if (!selectedAccount) {
          this.saving.set(false);

          this.notificationService.error('Selected account not found.');

          return;
        }

        const newBalance = this.calculateBalance(
          selectedAccount.balance,
          formValue.amount,
          formValue.transactionType,
        );

        if (newBalance === null) {
          this.saving.set(false);

          this.notificationService.error('Insufficient account balance.');

          return;
        }

        const updatedAccount: Account = {
          ...selectedAccount,

          balance: newBalance,
        };

        this.accountsService
          .updateAccount(selectedAccount.id, updatedAccount)
          .subscribe({
            next: () => {
              const transaction: CreateTransaction = {
                transactionNumber: this.generateTransactionNumber(transactions),

                accountId: formValue.accountId,

                customerId: formValue.customerId,

                transactionType: formValue.transactionType,

                amount: formValue.amount,

                description: formValue.description.trim(),

                transactionDate:
                  formValue.transactionDate?.toISOString().split('T')[0] ?? '',

                status: formValue.status,

                balanceAfterTransaction: newBalance,
              };

              this.transactionsService
                .createTransaction(transaction)
                .subscribe({
                  next: () => {
                    this.saving.set(false);

                    this.notificationService.successCreate();

                    this.router.navigate(['/app/transactions']);
                  },

                  error: () => {
                    this.saving.set(false);

                    this.notificationService.createError();
                  },
                });
            },

            error: () => {
              this.saving.set(false);

              this.notificationService.updateError();
            },
          });
      },

      error: () => {
        this.saving.set(false);

        this.notificationService.loadError();
      },
    });
  }

  /**
   * Calculates account balance
   * after transaction.
   */
  private calculateBalance(
    currentBalance: number,
    amount: number,
    type: TransactionType,
  ): number | null {
    switch (type) {
      case TransactionType.CREDIT:
        return currentBalance + amount;

      case TransactionType.DEBIT:
      case TransactionType.TRANSFER:
        if (amount > currentBalance) {
          return null;
        }

        return currentBalance - amount;

      default:
        return currentBalance;
    }
  }
  /**
   * Generates the next transaction number.
   */
  private generateTransactionNumber(transactions: Transaction[]): string {
    if (transactions.length === 0) {
      return 'TXN100001';
    }
    const highestNumber = Math.max(
      ...transactions.map((transaction) =>
        Number(transaction.transactionNumber.replace('TXN', '')),
      ),
    );

    return `TXN${String(highestNumber + 1).padStart(6, '0')}`;
  }

  /**
   * Returns the selected account.
   */
  private getSelectedAccount(): Account | undefined {
    return this.accounts().find(
      (account) => account.id === this.transactionForm.controls.accountId.value,
    );
  }

  /**
   * Resets the form after
   * successful creation.
   */
  private resetForm(): void {
    this.transactionForm.reset({
      customerId: '',

      accountId: '',

      transactionType: TransactionType.CREDIT,

      amount: 0,

      description: '',

      transactionDate: new Date(),

      status: TransactionStatus.SUCCESS,

      balanceAfterTransaction: 0,
    });
  }

  /**
   * Cancels transaction creation.
   */
  protected cancel(): void {
    this.router.navigate(['/app/transactions']);
  }
}
