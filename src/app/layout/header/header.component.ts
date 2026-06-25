import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../features/auth/services/auth.service';
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

  private readonly authService = inject(AuthService);

  protected logout(): void {
    this.authService.logout();
    this.router.navigate([ROUTES.ROOT, ROUTES.AUTH.ROOT, ROUTES.AUTH.LOGIN]);
  }
}
