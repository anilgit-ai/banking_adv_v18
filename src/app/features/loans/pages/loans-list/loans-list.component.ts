import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { forkJoin } from 'rxjs';
import { CustomersService } from '../../../customers/services/customers.service';
import { LoansService } from '../../service/loans.service';
import { NotificationService } from '../../../../shared/toast/services/notification.service';
import { Loan } from '../../models/loan.model';
import { LoanView } from '../../models/loan-view.model';
import { LoanFilter } from '../../models/loan-filter.model';
import { Customer } from '../../../customers/models/customer.model';
import { LoanFiltersComponent } from '../../components/loan-filters/loan-filters.component';
import { LoanTableComponent } from '../../components/loan-table/loan-table.component';
@Component({
  selector: 'app-loans-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    LoanFiltersComponent,
    LoanTableComponent,
  ],
  templateUrl: './loans-list.component.html',
  styleUrl: './loans-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoansListComponent implements OnInit {
  /**
   * Loans Service.
   */
  private readonly loansService = inject(LoansService);
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
   * All loans.
   */
  protected readonly loans = signal<LoanView[]>([]);
  /**
   * Filtered loans.
   */
  protected readonly filteredLoans = signal<LoanView[]>([]);
  /**
   * Customers.
   */
  protected readonly customers = signal<Customer[]>([]);
  /**
   * Loading state.
   */
  protected readonly loading = signal(true);
  /**
   * Error state.
   */
  protected readonly hasError = signal(false);
  /**
   * Component initialization.
   */
  ngOnInit(): void {
    this.loadLoans();
  }
  /**
   * Loads loans.
   */
  private loadLoans(): void {
    this.loading.set(true);
    this.hasError.set(false);
    forkJoin({
      loans: this.loansService.getLoans(),
      customers: this.customersService.getCustomers(),
    }).subscribe({
      next: ({ loans, customers }) => {
        this.customers.set(customers);
        const mappedLoans = this.mapLoans(loans, customers);
        this.loans.set(mappedLoans);
        this.filteredLoans.set(mappedLoans);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.hasError.set(true);
        this.notificationService.loadError();
      },
    });
  }
  /**
   * Maps loans for display.
   */
  private mapLoans(loans: Loan[], customers: Customer[]): LoanView[] {
    return loans.map((loan) => {
      const customer = customers.find(
        (customer) => customer.id === loan.customerId,
      );
      return {
        ...loan,
        customerName: customer?.fullName ?? 'Unknown Customer',
      };
    });
  }
  /**
   * Applies filters.
   */
  protected applyFilters(filters: LoanFilter): void {
    let loans = [...this.loans()];
    if (filters.search.trim()) {
      const search = filters.search.toLowerCase();
      loans = loans.filter((loan) =>
        loan.loanNumber.toLowerCase().includes(search),
      );
    }
    if (filters.customerId) {
      loans = loans.filter((loan) => loan.customerId === filters.customerId);
    }
    if (filters.loanType) {
      loans = loans.filter((loan) => loan.loanType === filters.loanType);
    }
    if (filters.status) {
      loans = loans.filter((loan) => loan.status === filters.status);
    }
    this.filteredLoans.set(loans);
  }
  /**
   * Navigates to create page.
   */
  protected createLoan(): void {
    this.router.navigate(['/app/loans/new']);
  }
  /**
   * Navigates to details page.
   */
  protected viewLoan(id: string): void {
    this.router.navigate(['/app/loans', id]);
  }
  /**
   * Navigates to edit page.
   */
  protected editLoan(id: string): void {
    this.router.navigate(['/app/loans', id, 'edit']);
  }
  /**
   * Deletes a loan.
   */
  protected deleteLoan(id: string): void {
    if (!confirm('Delete this loan?')) {
      return;
    }
    this.loansService.deleteLoan(id).subscribe({
      next: () => {
        this.notificationService.successDelete();
        this.loadLoans();
      },
      error: () => {
        this.notificationService.deleteError();
      },
    });
  }
  /**
   * Reloads loans.
   */
  protected reload(): void {
    this.loadLoans();
  }
}
