import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

import { AuthStore } from '../../store/auth/auth.store';

import { ROUTES } from '../constants/routes.constants';

/**
 * Enterprise Authentication Guard.
 *
 * Runs BEFORE a protected route is activated.
 *
 * Responsibilities:
 *
 * ✔ Check whether user is logged in
 * ✔ Redirect to Login if session does not exist
 */
export const authGuard: CanActivateFn = () => {
  // Inject Auth Store
  const authStore = inject(AuthStore);

  // Inject Router
  const router = inject(Router);

  /**
   * If user is NOT authenticated
   * redirect to Login page.
   */
  if (!authStore.isAuthenticated()) {
    router.navigate([ROUTES.ROOT, ROUTES.AUTH.ROOT, ROUTES.AUTH.LOGIN]);

    return false;
  }

  /**
   * Allow route activation.
   */
  return true;
};
