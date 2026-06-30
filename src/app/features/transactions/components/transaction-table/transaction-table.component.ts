import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { HighlightPipe } from '../../../../shared/pipes/highlight.pipe';

import { TransactionStatus } from '../../enums/transaction-status.enum';
import { TransactionType } from '../../enums/transaction-type.enum';
import { Transaction } from '../../models/transaction.model';
import { TransactionView } from '../../models/transaction-view.model';

/**
 * View model used by the table.
 */


@Component({
  selector: 'app-transaction-table',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    HighlightPipe,
  ],

  templateUrl: './transaction-table.component.html',

  styleUrl: './transaction-table.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionTableComponent {
  /**
   * Transactions received from parent.
   */
  readonly transactions = input.required<TransactionView[]>();

  /**
   * Search keyword.
   */
  readonly searchKeyword = input('');

  /**
   * Delete transaction event.
   */
  readonly delete = output<string>();

  /**
   * Returns tag severity
   * based on transaction status.
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
   * Returns tag severity
   * based on transaction type.
   */
  protected getTypeSeverity(
    type: TransactionType,
  ): 'success' | 'danger' | 'info' {
    switch (type) {
      case TransactionType.CREDIT:
        return 'success';

      case TransactionType.DEBIT:
        return 'danger';

      case TransactionType.TRANSFER:
        return 'info';

      default:
        return 'info';
    }
  }
}
