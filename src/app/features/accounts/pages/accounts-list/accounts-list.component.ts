import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { ConfirmationService } from 'primeng/api';

import { Account } from '../../models/account.model';

import { AccountsService } from '../../services/accounts.service';

import { AccountTableComponent } from '../../components/account-table/account-table.component';

import { AccountFiltersComponent } from '../../components/account-filters/account-filters.component';

import { NotificationService } from '../../../../shared/toast/services/notification.service';

@Component({
  selector: 'app-accounts-list',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RouterLink,
    AccountTableComponent,
    AccountFiltersComponent,
  ],

  templateUrl: './accounts-list.component.html',

  styleUrl: './accounts-list.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListComponent implements OnInit {
  /**
   * Accounts service.
   */
  private readonly accountsService = inject(AccountsService);

  /**
   * Router.
   */
  private readonly router = inject(Router);

  /**
   * Confirmation dialog.
   */
  private readonly confirmationService = inject(ConfirmationService);

  /**
   * Notification service.
   */
  private readonly notificationService = inject(NotificationService);

  /**
   * Filtered accounts.
   */
  protected readonly accounts = signal<Account[]>([]);

  /**
   * Original accounts.
   */
  private readonly allAccounts = signal<Account[]>([]);

  /**
   * Search keyword.
   */
  protected readonly searchKeyword = signal('');

  /**
   * Selected account type.
   */
  protected readonly selectedAccountType = signal('');

  /**
   * Selected account status.
   */
  protected readonly selectedStatus = signal('');

  /**
   * Loading state.
   */
  protected readonly loading = signal(false);

  /**
   * Error state.
   */
  protected readonly hasError = signal(false);

  /**
   * Initializes component.
   */
  public ngOnInit(): void {
    this.loadAccounts();
  }

  /**
   * Loads accounts.
   */
  private loadAccounts(): void {
    this.loading.set(true);

    this.hasError.set(false);

    this.accountsService.getAccounts().subscribe({
      next: (accounts) => {
        this.allAccounts.set(accounts);

        this.accounts.set(accounts);

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
   * Applies search and filters.
   */
  protected applyFilters(): void {
    const keyword = this.searchKeyword().trim().toLowerCase();

    const filtered = this.allAccounts().filter((account) => {
      const matchesSearch =
        !keyword ||
        account.accountHolder.toLowerCase().includes(keyword) ||
        account.accountNumber.toLowerCase().includes(keyword);

      const matchesType =
        !this.selectedAccountType() ||
        account.accountType === this.selectedAccountType();

      const matchesStatus =
        !this.selectedStatus() || account.status === this.selectedStatus();

      return matchesSearch && matchesType && matchesStatus;
    });

    this.accounts.set(filtered);
  }

  /**
   * Navigates to create page.
   */
  protected createAccount(): void {
    this.router.navigate(['/app/accounts/new']);
  }

  /**
   * Deletes account.
   */
  protected deleteAccount(id: string): void {
    this.confirmationService.confirm({
      header: 'Delete Account',

      message: 'Are you sure you want to delete this account?',

      icon: 'pi pi-exclamation-triangle',

      acceptLabel: 'Delete',

      rejectLabel: 'Cancel',

      acceptButtonStyleClass: 'p-button-danger',

      accept: () => {
        this.accountsService.deleteAccount(id).subscribe({
          next: () => {
            this.notificationService.successDelete();

            this.loadAccounts();
          },

          error: () => {
            this.notificationService.deleteError();
          },
        });
      },

      reject: () => {
        this.notificationService.info(
          'Account deletion cancelled.',
          'Cancelled',
        );
      },
    });
  }
  /**
 * Clears all filters.
 */
protected clearFilters(): void {
  this.searchKeyword.set('');
  this.selectedAccountType.set('');
  this.selectedStatus.set('');
  this.accounts.set(
    this.allAccounts(),
  );
}
}
