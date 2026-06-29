import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { NotificationService } from '../../../../shared/toast/services/notification.service';
import { Customer } from '../../models/customer.model';
import { CustomerStatus } from '../../enums/customer-status.enum';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customer-details',

  standalone: true,

  imports: [CommonModule, RouterModule, ButtonModule, TagModule],

  templateUrl: './customer-details.component.html',

  styleUrl: './customer-details.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDetailsComponent implements OnInit {
  /**
   * Customers service.
   */
  private readonly customersService = inject(CustomersService);

  /**
   * Activated route.
   */
  private readonly route = inject(ActivatedRoute);

  /**
   * Router.
   */
  protected readonly router = inject(Router);

  /**
   * Notification service.
   */
  private readonly notificationService = inject(NotificationService);

  /**
   * Customer.
   */
  protected readonly customer = signal<Customer | null>(null);

  /**
   * Loading state.
   */
  protected readonly loading = signal(true);

  /**
   * Component initialization.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/app/customers']);
      return;
    }

    this.loadCustomer(id);
  }

  /**
   * Loads customer.
   */
  private loadCustomer(id: string): void {
    this.loading.set(true);

    this.customersService.getCustomerById(id).subscribe({
      next: (customer) => {
        this.customer.set(customer);

        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);

        this.notificationService.loadError();

        this.router.navigate(['/app/customers']);
      },
    });
  }

  /**
   * Returns tag severity.
   */
  protected getSeverity(status: CustomerStatus): 'success' | 'warn' | 'danger' {
    switch (status) {
      case CustomerStatus.ACTIVE:
        return 'success';

      case CustomerStatus.INACTIVE:
        return 'warn';

      case CustomerStatus.BLOCKED:
        return 'danger';

      default:
        return 'warn';
    }
  }

  /**
   * Back to customer list.
   */
  protected goBack(): void {
    this.router.navigate(['/app/customers']);
  }

  /**
   * Navigate to edit page.
   */
  protected editCustomer(): void {
    const customer = this.customer();

    if (!customer) {
      return;
    }

    this.router.navigate(['/app/customers', customer.id, 'edit']);
  }
}
