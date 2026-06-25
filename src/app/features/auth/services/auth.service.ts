import { Injectable, inject } from '@angular/core';

import { Observable, of, delay, tap } from 'rxjs';

import { StorageService } from '../../../core/services/storage.service';

import { AuthStore } from '../../../store/auth/auth.store';

import { AuthUser } from '../models/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storage = inject(StorageService);

  private readonly authStore = inject(AuthStore);

  /**
   * Mock login.
   *
   * Later replaced with HTTP API.
   */
  public login(email: string, password: string): Observable<AuthUser> {
    const user: AuthUser = {
      id: '1',

      fullName: 'John Doe',

      email,

      role: 'ADMIN' as never,

      token: 'mock-jwt-token',
    };

    return of(user).pipe(
      delay(1000),

      tap((authUser) => {
        this.storage.setItem('access_token', authUser.token);

        this.authStore.setUser(authUser);
      }),
    );
  }

  /**
   * Logout user.
   */
  public logout(): void {
    this.storage.clear();

    this.authStore.clear();
  }
}
