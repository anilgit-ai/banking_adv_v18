import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

import { TRANSACTION_CONSTANTS } from '../../constants/transaction.constants';

@Component({
  selector: 'app-transaction-filters',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
  ],

  templateUrl: './transaction-filters.component.html',

  styleUrl: './transaction-filters.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFiltersComponent {
  /**
   * Search keyword.
   */
  readonly searchKeyword = input('');

  /**
   * Selected transaction type.
   */
  readonly selectedTransactionType = input('');

  /**
   * Selected status.
   */
  readonly selectedStatus = input('');

  /**
   * Search change event.
   */
  readonly searchKeywordChange = output<string>();

  /**
   * Transaction type change event.
   */
  readonly transactionTypeChange = output<string>();

  /**
   * Status change event.
   */
  readonly statusChange = output<string>();

  /**
   * Clear filters event.
   */
  readonly clearFilters = output<void>();

  /**
   * Transaction Types.
   */
  protected readonly transactionTypes = [
    {
      label: 'All Types',
      value: '',
    },
    ...TRANSACTION_CONSTANTS.TYPES,
  ];

  /**
   * Transaction Statuses.
   */
  protected readonly transactionStatuses = [
    {
      label: 'All Status',
      value: '',
    },
    ...TRANSACTION_CONSTANTS.STATUSES,
  ];
}
