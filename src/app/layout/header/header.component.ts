import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../features/auth/services/auth.service';
import { AuthStore } from '../../store/auth/auth.store';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  /**
   * Authentication service.
   */
  private readonly authService = inject(AuthService);

  /**
   * Global authentication state.
   */
  private readonly authStore = inject(AuthStore);

  /**
   * Logged-in user.
   *
   * Header is rendered only after authentication,
   * but optional chaining prevents runtime errors.
   */
  protected readonly currentUser = computed(() => this.authStore.user());

  /**
   * Logout current user.
   */
  protected logout(): void {
    this.authService.logout();
    this.router.navigate([ROUTES.ROOT, ROUTES.AUTH.ROOT, ROUTES.AUTH.LOGIN]);
  }
}
