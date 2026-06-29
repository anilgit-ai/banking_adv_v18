import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { NotificationService } from '../../../../shared/toast/services/notification.service';
import { CustomerStatus } from '../../enums/customer-status.enum';
import { Gender } from '../../enums/gender.enum';
import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-create-customer',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CustomerFormComponent,
  ],

  templateUrl: './create-customer.component.html',

  styleUrl: './create-customer.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerComponent {
  /**
   * Form Builder.
   */
  private readonly fb = inject(FormBuilder);

  /**
   * Customers Service.
   */
  private readonly customersService = inject(CustomersService);

  /**
   * Router.
   */
  private readonly router = inject(Router);

  /**
   * Notification Service.
   */
  private readonly notificationService = inject(NotificationService);

  /**
   * Saving state.
   */
  protected readonly saving = signal(false);

  /**
   * Customer Form.
   */
  protected readonly customerForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],

    email: ['', [Validators.required, Validators.email]],

    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],

    gender: [Gender.MALE, Validators.required],

    dateOfBirth: [null as Date | null, Validators.required],

    aadhaarNumber: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]{12}$/)],
    ],

    panNumber: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)],
    ],

    address: ['', Validators.required],

    status: [CustomerStatus.ACTIVE, Validators.required],
  });

  /**
   * Creates a new customer.
   */
  protected createCustomer(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    this.customersService.getCustomers().subscribe({
      next: (customers) => {
        if (!this.validateDuplicateCustomer(customers)) {
          this.saving.set(false);
          return;
        }

        const customer: Customer = {
          id: crypto.randomUUID(),

          customerId: this.generateCustomerId(customers),

          fullName: this.customerForm.controls.fullName.value.trim(),

          email: this.customerForm.controls.email.value.trim().toLowerCase(),

          phoneNumber: this.customerForm.controls.phoneNumber.value,

          gender: this.customerForm.controls.gender.value,

          dateOfBirth: this.customerForm.controls.dateOfBirth
            .value!.toISOString()
            .split('T')[0],

          aadhaarNumber: this.customerForm.controls.aadhaarNumber.value,

          panNumber: this.customerForm.controls.panNumber.value.toUpperCase(),

          address: this.customerForm.controls.address.value.trim(),

          status: this.customerForm.controls.status.value,
        };

        this.customersService.createCustomer(customer).subscribe({
          next: () => {
            this.saving.set(false);

            this.notificationService.successCreate();

            this.router.navigate(['/app/customers']);
          },

          error: () => {
            this.saving.set(false);

            this.notificationService.createError();
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
   * Cancel creation.
   */
  protected cancel(): void {
    this.router.navigate(['/app/customers']);
  }

  /**
   * Checks duplicate customer.
   */
  private validateDuplicateCustomer(customers: Customer[]): boolean {
    const value = this.customerForm.getRawValue();

    const duplicate = customers.find(
      (customer) =>
        customer.email.toLowerCase() === value.email.trim().toLowerCase() ||
        customer.phoneNumber === value.phoneNumber ||
        customer.aadhaarNumber === value.aadhaarNumber ||
        customer.panNumber.toUpperCase() === value.panNumber.toUpperCase(),
    );

    if (!duplicate) {
      return true;
    }

    if (duplicate.email.toLowerCase() === value.email.trim().toLowerCase()) {
      this.notificationService.error(
        'Customer with this email already exists.',
      );

      return false;
    }

    if (duplicate.phoneNumber === value.phoneNumber) {
      this.notificationService.error(
        'Customer with this phone number already exists.',
      );

      return false;
    }

    if (duplicate.aadhaarNumber === value.aadhaarNumber) {
      this.notificationService.error(
        'Customer with this Aadhaar number already exists.',
      );

      return false;
    }

    this.notificationService.error(
      'Customer with this PAN number already exists.',
    );

    return false;
  }

  /**
   * Generates the next customer id.
   */
  private generateCustomerId(customers: Customer[]): string {
    if (!customers.length) {
      return 'CUST1001';
    }

    const maxId = Math.max(
      ...customers.map((customer) =>
        Number(customer.customerId.replace('CUST', '')),
      ),
    );

    return `CUST${maxId + 1}`;
  }
}
