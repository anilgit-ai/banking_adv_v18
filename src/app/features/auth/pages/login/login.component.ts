import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../../shared/toast/services/notification.service';

import { ROUTES } from '../../../../core/constants/routes.constants';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],

  templateUrl: './login.component.html',

  styleUrl: './login.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  /**
   * Handles authentication.
   */
  private readonly authService = inject(AuthService);

  /**
   * Handles application notifications.
   */
  private readonly notificationService = inject(NotificationService);

  /**
   * Handles page navigation.
   */
  private readonly router = inject(Router);

  /**
   * Strongly typed login form.
   */
  protected readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,

      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl('', {
      nonNullable: true,

      validators: [Validators.required],
    }),
  });

  /**
   * Authenticate user.
   *
   * Flow:
   *
   * Validate Form
   *      ↓
   * Call AuthService
   *      ↓
   * Success → Dashboard
   * Error → Show Notification
   */
  protected login(): void {
    /**
     * Stop execution if form is invalid.
     */
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    /**
     * Read form values.
     */
    const { email, password } = this.loginForm.getRawValue();

    /**
     * Authenticate user.
     */
    this.authService.login(email, password).subscribe({
      /**
       * Login successful.
       */
      next: () => {
        this.notificationService.loginSuccess();

        this.router.navigate([ROUTES.ROOT, ROUTES.APP.DASHBOARD]);
      },

      /**
       * Login failed.
       */
      error: (error: Error) => {
        this.notificationService.error(error.message);
      },
    });
  }
}
