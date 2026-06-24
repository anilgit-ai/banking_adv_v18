import { Injectable, computed, signal } from '@angular/core';

import { NotificationMessage } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationStore {
  private readonly notificationsSignal = signal<NotificationMessage[]>([]);

  public readonly notifications = computed(() => this.notificationsSignal());

  public add(notification: NotificationMessage): void {
    this.notificationsSignal.update((items) => [...items, notification]);
  }

  public clear(): void {
    this.notificationsSignal.set([]);
  }
}
