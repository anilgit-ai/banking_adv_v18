import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Customer } from '../../../customers/models/customer.model';
import { LoanFilter } from '../../models/loan-filter.model';
import { LoanType } from '../../enums/loan-type.enum';
import { LoanStatus } from '../../enums/loan-status.enum';
import { LOAN_CONSTANTS } from '../../constants/loan.constants';
@Component({
  selector: 'app-loan-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
  ],
  templateUrl: './loan-filters.component.html',
  styleUrl: './loan-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanFiltersComponent {
  /**
   * Form Builder.
   */
  private readonly fb = inject(FormBuilder);
  /**
   * Customers.
   */
  readonly customers = input.required<Customer[]>();
  /**
   * Filter changed event.
   */
  readonly filterChanged = output<LoanFilter>();
  /**
   * Loan Types.
   */
  protected readonly loanTypes = [...LOAN_CONSTANTS.TYPES];
  /**
   * Loan Statuses.
   */
  protected readonly loanStatuses = [...LOAN_CONSTANTS.STATUSES];
  /**
   * Filter form.
   */
  protected readonly filterForm = this.fb.group({
    search: this.fb.nonNullable.control(''),
    customerId: this.fb.control<string | null>(null),
    loanType: this.fb.control<LoanType | null>(null),
    status: this.fb.control<LoanStatus | null>(null),
  });
  constructor() {
    this.filterForm.valueChanges.subscribe(() => {
      this.emitFilters();
    });
  }
  /**
   * Emits filters.
   */
  private emitFilters(): void {
    this.filterChanged.emit({
      search: this.filterForm.controls.search.value,
      customerId: this.filterForm.controls.customerId.value,
      loanType: this.filterForm.controls.loanType.value,
      status: this.filterForm.controls.status.value,
    });
  }
  /**
   * Clears filters.
   */
  protected clearFilters(): void {
    this.filterForm.reset({
      search: '',
      customerId: null,
      loanType: null,
      status: null,
    });
    this.emitFilters();
  }
}
