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
import { LoanStatus } from '../../enums/loan-status.enum';
import { LoanView } from '../../models/loan-view.model';
@Component({
  selector: 'app-loan-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
  ],
  templateUrl: './loan-table.component.html',
  styleUrl: './loan-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanTableComponent {
  /**
   * Loans.
   */
  readonly loans = input.required<LoanView[]>();
  /**
   * View event.
   */
  readonly view = output<string>();
  /**
   * Edit event.
   */
  readonly edit = output<string>();
  /**
   * Delete event.
   */
  readonly delete = output<string>();
  /**
   * Returns tag severity.
   */
  protected getStatusSeverity(
    status: LoanStatus,
  ): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case LoanStatus.ACTIVE:
        return 'success';
      case LoanStatus.PENDING:
        return 'warn';
      case LoanStatus.REJECTED:
        return 'danger';
      case LoanStatus.APPROVED:
        return 'info';
      case LoanStatus.CLOSED:
        return 'success';
      default:
        return 'info';
    }
  }
}