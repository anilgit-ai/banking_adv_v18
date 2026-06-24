import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  /**
   * Tracks active HTTP requests.
   *
   * Example:
   *
   * Request A starts → count = 1
   * Request B starts → count = 2
   *
   * Request A ends → count = 1
   * Request B ends → count = 0
   *
   * Loader hides only when count reaches 0.
   */
  private readonly activeRequests = signal<number>(0);

  /**
   * Exposed computed signal.
   *
   * Returns:
   * true  -> show loader
   * false -> hide loader
   */
  public readonly isLoading = computed(() => this.activeRequests() > 0);

  /**
   * Called whenever a request starts.
   */
  public show(): void {
    this.activeRequests.update((count) => count + 1);
  }

  /**
   * Called whenever a request finishes.
   *
   * Prevents negative values.
   */
  public hide(): void {
    this.activeRequests.update((count) => Math.max(count - 1, 0));
  }

  /**
   * Emergency reset.
   *
   * Useful during logout
   * or application recovery.
   */
  public reset(): void {
    this.activeRequests.set(0);
  }
}
