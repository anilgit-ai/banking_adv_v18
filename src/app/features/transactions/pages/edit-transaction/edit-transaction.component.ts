import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { forkJoin } from 'rxjs';

import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';

import { TransactionsService } from '../../services/transactions.service';
import { CustomersService } from '../../../customers/services/customers.service';
import { AccountsService } from '../../../accounts/services/accounts.service';

import { NotificationService } from '../../../../shared/toast/services/notification.service';

import { Customer } from '../../../customers/models/customer.model';
import { Account } from '../../../accounts/models/account.model';
import { Transaction } from '../../models/transaction.model';

import { TransactionStatus } from '../../enums/transaction-status.enum';
import { TransactionType } from '../../enums/transaction-type.enum';

@Component({
  selector: 'app-edit-transaction',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TransactionFormComponent,
  ],

  templateUrl: './edit-transaction.component.html',

  styleUrl: './edit-transaction.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTransactionComponent implements OnInit {
  /**
   * Form Builder.
   */
  private readonly fb = inject(FormBuilder);

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
   * Transaction Id.
   */
  private transactionId = '';

  /**
   * Original transaction.
   */
  private originalTransaction!: Transaction;

  /**
   * Customers.
   */
  protected readonly customers = signal<Customer[]>([]);

  /**
   * Accounts.
   */
  protected readonly accounts = signal<Account[]>([]);

  /**
   * Loading state.
   */
  protected readonly loading = signal(true);

  /**
   * Saving state.
   */
  protected readonly saving = signal(false);

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
    this.transactionId = this.route.snapshot.paramMap.get('id') ?? '';

    this.loadData();
  }

  /**
   * Loads transaction,
   * customers and accounts.
   */
  private loadData(): void {
    this.loading.set(true);

    forkJoin({
      transaction: this.transactionsService.getTransactionById(
        this.transactionId,
      ),

      customers: this.customersService.getCustomers(),

      accounts: this.accountsService.getAccounts(),
    }).subscribe({
      next: ({ transaction, customers, accounts }) => {
        this.originalTransaction = transaction;

        this.customers.set(customers);

        this.accounts.set(accounts);

        this.transactionForm.patchValue({
          customerId: transaction.customerId,

          accountId: transaction.accountId,

          transactionType: transaction.transactionType,

          amount: transaction.amount,

          description: transaction.description,

          transactionDate: new Date(transaction.transactionDate),

          status: transaction.status,

          balanceAfterTransaction: transaction.balanceAfterTransaction,
        });

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
   * Updates the transaction.
   */
  protected updateTransaction(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();

      return;
    }

    this.saving.set(true);

    const formValue = this.transactionForm.getRawValue();

    const selectedAccount = this.accounts().find(
      (account) => account.id === formValue.accountId,
    );

    if (!selectedAccount) {
      this.saving.set(false);

      this.notificationService.error('Selected account not found.');

      return;
    }

    /*
     * Reverse previous transaction.
     */
    const restoredBalance = this.reverseTransactionEffect(
      selectedAccount.balance,
      this.originalTransaction.amount,
      this.originalTransaction.transactionType,
    );

    /*
     * Apply updated transaction.
     */
    const newBalance = this.calculateBalance(
      restoredBalance,
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
      .updateAccount(updatedAccount.id, updatedAccount)
      .subscribe({
        next: () => {
          const updatedTransaction: Transaction = {
            ...this.originalTransaction,

            customerId: formValue.customerId,

            accountId: formValue.accountId,

            transactionType: formValue.transactionType,

            amount: formValue.amount,

            description: formValue.description.trim(),

            transactionDate:
              formValue.transactionDate?.toISOString().split('T')[0] ?? '',

            status: formValue.status,

            balanceAfterTransaction: newBalance,
          };

          this.transactionsService
            .updateTransaction(this.transactionId, updatedTransaction)
            .subscribe({
              next: () => {
                this.saving.set(false);

                this.notificationService.successUpdate();

                this.router.navigate(['/app/transactions']);
              },

              error: () => {
                this.saving.set(false);

                this.notificationService.updateError();
              },
            });
        },

        error: () => {
          this.saving.set(false);

          this.notificationService.updateError();
        },
      });
  }

  /**
   * Reverses previous transaction.
   */
  private reverseTransactionEffect(
    currentBalance: number,
    amount: number,
    type: TransactionType,
  ): number {
    switch (type) {
      case TransactionType.CREDIT:
        return currentBalance - amount;

      case TransactionType.DEBIT:

      case TransactionType.TRANSFER:
        return currentBalance + amount;

      default:
        return currentBalance;
    }
  }

  /**
   * Calculates new balance.
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
   * Returns the selected account.
   */
  private getSelectedAccount(): Account | undefined {
    return this.accounts().find(
      (account) => account.id === this.transactionForm.controls.accountId.value,
    );
  }

  /**
   * Resets the form to the
   * original transaction values.
   */
  private resetForm(): void {
    this.transactionForm.reset({
      customerId: this.originalTransaction.customerId,

      accountId: this.originalTransaction.accountId,

      transactionType: this.originalTransaction.transactionType,

      amount: this.originalTransaction.amount,

      description: this.originalTransaction.description,

      transactionDate: new Date(this.originalTransaction.transactionDate),

      status: this.originalTransaction.status,

      balanceAfterTransaction: this.originalTransaction.balanceAfterTransaction,
    });
  }

  /**
   * Cancels editing.
   */
  protected cancel(): void {
    this.router.navigate(['/app/transactions']);
  }
}
