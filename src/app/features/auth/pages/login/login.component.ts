import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/toast/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
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
   * Login button click.
   */
  protected login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password).subscribe({
      next: () => {
        this.notificationService.show('success' as never, 'Login Successful');

        this.router.navigate(['/app/dashboard']);
      },
    });
  }
}
