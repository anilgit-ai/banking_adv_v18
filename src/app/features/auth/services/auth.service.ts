import { Injectable, inject } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { StorageService } from '../../../core/services/storage.service';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';
import { STORAGE_KEYS } from '../../../core/constants/storage.constants';

import { AuthStore } from '../../../store/auth/auth.store';

import { AuthUser } from '../models/auth-user.model';
import { LoginUser } from '../models/login-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  /**
   * Browser storage abstraction.
   */
  private readonly storage = inject(StorageService);

  /**
   * Global authentication state.
   */
  private readonly authStore = inject(AuthStore);

  /**
   * Authenticate user.
   *
   * NOTE:
   * json-server has no real login endpoint.
   *
   * We fetch the user by email and
   * validate the password on the client.
   *
   * Later this becomes:
   *
   * POST /auth/login
   */
  public login(email: string, password: string): Observable<AuthUser> {
    return this.get<LoginUser[]>(
      `${API_ENDPOINTS.AUTH.LOGIN}?email=${encodeURIComponent(email)}`,
    ).pipe(
      /**
       * Validate credentials.
       */
      map((users) => {
        const user = users[0];

        if (!user) {
          throw new Error(APP_CONSTANTS.TOAST_MESSAGES.INVALID_CREDENTIALS);
        }

        if (user.password !== password) {
          throw new Error(APP_CONSTANTS.TOAST_MESSAGES.INVALID_CREDENTIALS);
        }

        /**
         * Convert backend model
         * to application model.
         */
        const authUser: AuthUser = {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          role: user.role,
          token: user.token,
        };

        return authUser;
      }),

      /**
       * Persist authenticated session.
       */
      tap((authUser) => {
        this.storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authUser.token);

        this.storage.setItem(
          STORAGE_KEYS.CURRENT_USER,
          JSON.stringify(authUser),
        );

        this.authStore.setUser(authUser);
      }),
    );
  }

  /**
   * Logout current user.
   *
   * Clears browser storage
   * and authentication state.
   */
  public logout(): void {
    this.storage.clear();

    this.authStore.clear();
  }

  /**
   * Returns whether
   * user is authenticated.
   */
  public isAuthenticated(): boolean {
    return this.authStore.isAuthenticated();
  }

  /**
   * Returns currently
   * logged in user.
   */
  public currentUser(): AuthUser | null {
    return this.authStore.user();
  }
}
