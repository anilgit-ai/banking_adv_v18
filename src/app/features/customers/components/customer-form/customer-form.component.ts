import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { CustomerForm } from '../../models/customer-form.model';
import { CUSTOMER_CONSTANTS } from '../../constants/customer.constants';

@Component({
  selector: 'app-customer-form',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
  ],

  templateUrl: './customer-form.component.html',

  styleUrl: './customer-form.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFormComponent {
  /**
   * Customer form.
   */
  readonly form = input.required<FormGroup<CustomerForm>>();

  /**
   * Gender options.
   */
  protected readonly genders = [...CUSTOMER_CONSTANTS.GENDERS];

  /**
   * Status options.
   */
  protected readonly statuses = [...CUSTOMER_CONSTANTS.STATUSES];

  /**
   * Maximum DOB.
   */
  protected readonly today = new Date();

  /**
   * Allows only numeric input.
   */
  protected allowOnlyNumbers(event: Event): void {
    const input = event.target as HTMLInputElement;

    input.value = input.value.replace(/\D/g, '');

    const controlName = input.getAttribute('formControlName');

    if (controlName) {
      this.form().controls[controlName as keyof CustomerForm].setValue(
        input.value as never,
      );
    }
  }

  /**
   * Converts PAN to uppercase.
   */
  protected convertPanToUppercase(): void {
    const control = this.form().controls.panNumber;

    control.setValue(control.value.toUpperCase(), {
      emitEvent: false,
    });
  }
}
