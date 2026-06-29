import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { finalize } from 'rxjs';

import { AccountsService } from '../../services/accounts.service';
import { NotificationService } from '../../../../shared/toast/services/notification.service';

import { Account } from '../../models/account.model';
import { AccountStatus } from '../../enums/account-status.enum';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent implements OnInit {
  /* ==========================================
     Services
  ========================================== */

  private readonly accountsService = inject(AccountsService);

  private readonly notificationService = inject(NotificationService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  /* ==========================================
     State
  ========================================== */

  protected readonly account = signal<Account | null>(null);

  protected readonly loading = signal(false);

  /* ==========================================
     Lifecycle
  ========================================== */

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.navigateToAccounts();

      return;
    }

    this.loadAccount(id);
  }

  /* ==========================================
     API
  ========================================== */

  private loadAccount(id: string): void {
    this.loading.set(true);

    this.accountsService
      .getAccountById(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (account) => this.account.set(account),

        error: () => {
          this.notificationService.loadError();

          this.navigateToAccounts();
        },
      });
  }

  /* ==========================================
     Helpers
  ========================================== */

  protected getSeverity(
    status: AccountStatus,
  ): 'success' | 'warn' | 'danger' | 'info' {
    const severityMap: Record<
      AccountStatus,
      'success' | 'warn' | 'danger' | 'info'
    > = {
      [AccountStatus.ACTIVE]: 'success',
      [AccountStatus.INACTIVE]: 'warn',
      [AccountStatus.BLOCKED]: 'danger',
      [AccountStatus.CLOSED]: 'info',
    };

    return severityMap[status];
  }

  protected goBack(): void {
    this.navigateToAccounts();
  }

  private navigateToAccounts(): void {
    this.router.navigate(['/app/accounts']);
  }
}
