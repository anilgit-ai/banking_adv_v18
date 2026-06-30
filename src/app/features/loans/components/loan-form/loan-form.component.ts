import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { Customer } from '../../../customers/models/customer.model';
import { LoanForm } from '../../models/loan-form.model';
import { LOAN_CONSTANTS } from '../../constants/loan.constants';
@Component({
  selector: 'app-loan-form',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
    
  ],

  templateUrl: './loan-form.component.html',

  styleUrl: './loan-form.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanFormComponent {
  /**
   * Loan form.
   */
  readonly form = input.required<FormGroup<LoanForm>>();

  /**
   * Customers.
   */
  readonly customers = input.required<Customer[]>();

  /**
   * Loan types.
   */
  protected readonly loanTypes = [...LOAN_CONSTANTS.TYPES];

  /**
   * Loan statuses.
   */
  protected readonly loanStatuses = [...LOAN_CONSTANTS.STATUSES];

  /**
   * Maximum remarks length.
   */
  protected readonly maxRemarksLength =
    LOAN_CONSTANTS.VALIDATION.MAX_REMARKS_LENGTH;
}
