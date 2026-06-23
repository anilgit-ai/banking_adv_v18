import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly loadingSignal = signal<boolean>(false);
  public readonly isLoading = computed(() => this.loadingSignal());
  public show(): void {
    this.loadingSignal.set(true);
  }
  public hide(): void {
    this.loadingSignal.set(false);
  }
}
