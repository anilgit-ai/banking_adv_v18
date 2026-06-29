import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { AccountsService } from '../../services/accounts.service';

import { NotificationService } from '../../../../shared/toast/services/notification.service';

import { UpdateAccount } from '../../models/update-account.model';

import { AccountStatus } from '../../enums/account-status.enum';

import { AccountType } from '../../enums/account-type.enum';
import { AccountFormComponent } from '../account-form/account-form.component';
import { ROUTES } from '../../../../core/constants/routes.constants';
@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    AccountFormComponent,
  ],

  templateUrl: './edit-account.component.html',

  styleUrl: './edit-account.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAccountComponent implements OnInit {
  /**
   * Accounts service.
   */
  private readonly accountsService = inject(AccountsService);

  /**
   * Activated route.
   */
  private readonly route = inject(ActivatedRoute);

  /**
   * Angular router.
   */
  private readonly router = inject(Router);

  /**
   * Toast notifications.
   */
  private readonly notificationService = inject(NotificationService);

  /**
   * Current account id.
   */
  private accountId = '';

  /**
   * Loading indicator.
   */
  protected readonly loading = signal(false);

  /**
   * Update button loading.
   */
  protected readonly saving = signal(false);

  /**
   * Edit account form.
   */
  protected readonly accountForm = new FormGroup({
    accountHolder: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),

    accountNumber: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ],
    }),

    accountType: new FormControl(AccountType.SAVINGS, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    balance: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),

    status: new FormControl(AccountStatus.ACTIVE, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  /**
   * Component initialization.
   */
  public ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id') ?? '';

    this.loadAccount();
  }

  /**
   * Loads account details.
   */
  private loadAccount(): void {
    this.loading.set(true);

    this.accountsService.getAccountById(this.accountId).subscribe({
      next: (account) => {
        this.accountForm.patchValue({
          accountHolder: account.accountHolder,

          accountNumber: account.accountNumber,

          accountType: account.accountType,

          balance: account.balance,

          status: account.status,
        });

        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);

        this.notificationService.loadError();

        this.router.navigate(['/app/accounts']);
      },
    });
  }

  /**
   * Updates account.
   */
  protected updateAccount(): void {
    console.log('Update button clicked');
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();

      return;
    }

    this.saving.set(true);

    const account = this.accountForm.getRawValue() as UpdateAccount;

    this.accountsService.updateAccount(this.accountId, account).subscribe({
      next: () => {
        this.saving.set(false);

        this.notificationService.successUpdate();

        this.router.navigate(['/app/accounts']);
      },

      error: () => {
        this.saving.set(false);

        this.notificationService.loadError();
      },
    });
  }

  /**
   * Cancel editing.
   */
  protected cancel(): void {
    this.router.navigate(['/app/accounts']);
  }
}
