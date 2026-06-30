import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

import { TransactionForm } from '../../models/transaction-form.model';
import { Customer } from '../../../customers/models/customer.model';
import { Account } from '../../../accounts/models/account.model';

import { TRANSACTION_CONSTANTS } from '../../constants/transaction.constants';

@Component({
  selector: 'app-transaction-form',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
  ],

  templateUrl: './transaction-form.component.html',

  styleUrl: './transaction-form.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent {
  /**
   * Transaction form.
   */
  readonly form = input.required<FormGroup<TransactionForm>>();

  /**
   * Customers.
   */
  readonly customers = input.required<Customer[]>();

  /**
   * Accounts.
   */
  readonly accounts = input.required<Account[]>();

  /**
   * Transaction Types.
   */
  protected readonly transactionTypes = [...TRANSACTION_CONSTANTS.TYPES];

  /**
   * Transaction Statuses.
   */
  protected readonly transactionStatuses = [...TRANSACTION_CONSTANTS.STATUSES];

  /**
   * Maximum selectable date.
   */
  protected readonly today = new Date();

  /**
   * Filters accounts based on
   * selected customer.
   */
  protected filteredAccounts(): Account[] {
    const customerId = this.form().controls.customerId.value;

    if (!customerId) {
      return [];
    }

    return this.accounts().filter(
      (account) => account.customerId === customerId,
    );
  }

  /**
   * Formats account label.
   */
  protected getAccountLabel(account: Account): string {
    return `${account.accountNumber} • ${account.accountType}`;
  }

  /**
   * Returns available balance.
   */
  protected getSelectedAccountBalance(): number | null {
    const accountId = this.form().controls.accountId.value;

    if (!accountId) {
      return null;
    }

    return (
      this.accounts().find((account) => account.id === accountId)?.balance ??
      null
    );
  }
}
