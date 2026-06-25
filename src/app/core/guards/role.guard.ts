import { inject } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { AuthStore } from '../../store/auth/auth.store';

import { USER_ROLE } from '../constants/roles.constants';
import { ROUTES } from '../constants/routes.constants';

/**
 * Enterprise Role Guard.
 *
 * Checks whether the logged-in user
 * has permission to access a route.
 */
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authStore = inject(AuthStore);

  const router = inject(Router);

  /**
   * Read current logged-in user.
   */
  const user = authStore.user();

  /**
   * Roles allowed for this route.
   */
  const allowedRoles = route.data['roles'] as USER_ROLE[];

  /**
   * User role not allowed.
   */
  if (!user || !allowedRoles.includes(user.role)) {
    router.navigate([ROUTES.ROOT, ROUTES.APP.DASHBOARD]);

    return false;
  }

  return true;
};
