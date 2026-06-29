import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { AccountsService } from '../../services/accounts.service';

import { NotificationService } from '../../../../shared/toast/services/notification.service';

import { CreateAccount } from '../../models/create-account.model';

import { AccountStatus } from '../../enums/account-status.enum';

import { AccountType } from '../../enums/account-type.enum';
import { AccountFormComponent } from '../account-form/account-form.component';
import { TOAST_SEVERITY } from '../../../../core/constants/app.constants';
import { ROUTES } from '../../../../core/constants/routes.constants';

@Component({
  selector: 'app-create-account',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    AccountFormComponent,
  ],

  templateUrl: './create-account.component.html',

  styleUrl: './create-account.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent {
  /**
   * Accounts service.
   */
  private readonly accountsService = inject(AccountsService);

  /**
   * Angular router.
   */
  private readonly router = inject(Router);

  /**
   * Toast notification service.
   */
  private readonly notificationService = inject(NotificationService);

  /**
   * Save button loading state.
   */
  protected readonly saving = signal(false);

  /**
   * Create account form.
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
   * Save account.
   */
  protected createAccount(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();

      return;
    }

    this.saving.set(true);

    const account = this.accountForm.getRawValue() as CreateAccount;

    this.accountsService.createAccount(account).subscribe({
      next: () => {
        this.saving.set(false);

        this.notificationService.show(
          TOAST_SEVERITY.SUCCESS,
          'Account created successfully.',
          'Success',
        );
        this.router.navigate(['/app/accounts']);
      },

      error: () => {
        this.saving.set(false);

        this.notificationService.show(
          TOAST_SEVERITY.ERROR,
          'Unable to create account.',
          'Error',
        );
      },
    });
  }

  /**
   * Cancel creation.
   */
  protected cancel(): void {
    this.router.navigate(['/app/accounts']);
  }
}
