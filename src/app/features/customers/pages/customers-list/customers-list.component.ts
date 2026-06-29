import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CustomerTableComponent } from '../../components/customer-table/customer-table.component';
import { CustomerFiltersComponent } from '../../components/customer-filters/customer-filters.component';
import { CustomersService } from '../../services/customers.service';
import { ConfirmationService } from 'primeng/api';
import { Customer } from '../../models/customer.model';
import { NotificationService } from '../../../../shared/toast/services/notification.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    CustomerTableComponent,
    CustomerFiltersComponent,
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersListComponent implements OnInit {
  // customers service for backend api
  private readonly customersService = inject(CustomersService);
  // Router for page routing
  private readonly router = inject(Router);
  // ConfirmationService
  private readonly confirmationService = inject(ConfirmationService);
  // Notification Service
  private readonly notificationService = inject(NotificationService);

  // Customers
  protected readonly customers = signal<Customer[]>([]);
  // Original Customers list
  private readonly allCustomers = signal<Customer[]>([]);
  // SearchKeyword
  readonly searchKeyword = signal('');
  // Gender Select
  protected readonly selectedGender = signal('');
  // Selected Status
  protected readonly selectedStatus = signal('');
  // loading state
  protected readonly loading = signal(false);
  // Error
  protected readonly hasError = signal(false);

  ngOnInit(): void {
    this.loadCustomers();
  }
  /**
   * Loads customers.
   */
  private loadCustomers(): void {
    this.loading.set(true);

    this.hasError.set(false);

    this.customersService.getCustomers().subscribe({
      next: (customers) => {
        console.log('Customers loaded:', customers);

        this.allCustomers.set(customers);
        this.customers.set(customers);
        this.loading.set(false);
      },

      error: (error) => {
        console.error('Customers API Error:', error);

        this.loading.set(false);
        this.hasError.set(true);

        this.notificationService.loadError();
      },
    });
  }

  /**
   * Applies search and filters.
   */
  protected applyFilters(): void {
    const keyword = this.searchKeyword().trim().toLowerCase();

    const filtered = this.allCustomers().filter((customer) => {
      const matchesSearch =
        !keyword ||
        customer.fullName.toLowerCase().includes(keyword) ||
        customer.customerId.toLowerCase().includes(keyword) ||
        customer.email.toLowerCase().includes(keyword);

      const matchesGender =
        !this.selectedGender() || customer.gender === this.selectedGender();

      const matchesStatus =
        !this.selectedStatus() || customer.status === this.selectedStatus();

      return matchesSearch && matchesGender && matchesStatus;
    });

    this.customers.set(filtered);
  }

  /**
   * Clears filters.
   */
  protected clearFilters(): void {
    this.searchKeyword.set('');

    this.selectedGender.set('');

    this.selectedStatus.set('');

    this.customers.set(this.allCustomers());
  }

  /**
   * Navigate to Create Customer.
   */
  protected createCustomer(): void {
    this.router.navigate(['/app/customers/new']);
  }

  /**
   * Deletes customer.
   */
  protected deleteCustomer(id: string): void {
    this.confirmationService.confirm({
      header: 'Delete Customer',

      message: 'Are you sure you want to delete this customer?',

      icon: 'pi pi-exclamation-triangle',

      acceptLabel: 'Delete',

      rejectLabel: 'Cancel',

      acceptButtonStyleClass: 'p-button-danger',

      accept: () => {
        this.customersService.deleteCustomer(id).subscribe({
          next: () => {
            this.notificationService.successDelete();

            this.loadCustomers();
          },

          error: () => {
            this.notificationService.deleteError();
          },
        });
      },

      reject: () => {
        this.notificationService.info(
          'Customer deletion cancelled.',
          'Cancelled',
        );
      },
    });
  }
}
