import { Injectable, computed, signal } from '@angular/core';

import { AuthUser } from '../../features/auth/models/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  /**
   * Stores authenticated user.
   *
   * Null means user not logged in.
   */
  private readonly userSignal = signal<AuthUser | null>(null);

  /**
   * Readonly user signal.
   */
  public readonly user = computed(() => this.userSignal());

  /**
   * Determines whether user is logged in.
   */
  public readonly isAuthenticated = computed(() => !!this.userSignal());

  /**
   * Stores user after successful login.
   */
  public setUser(user: AuthUser): void {
    this.userSignal.set(user);
  }

  /**
   * Clears session during logout.
   */
  public clear(): void {
    this.userSignal.set(null);
  }
}
