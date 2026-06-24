import { Injectable } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { ToastrService } from 'ngx-toastr';

import { NotificationStore } from '../store/notification.store';

import { NotificationMessage } from '../models/notification.model';

import {
  APP_CONSTANTS,
  TOAST_SEVERITY,
} from '../../../core/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly toastr: ToastrService,
    private readonly store: NotificationStore,
  ) {}

  public show(
    severity: TOAST_SEVERITY,
    detail: string,
    summary = 'Notification',
  ): void {
    const notification: NotificationMessage = {
      id: uuidv4(),

      severity,

      summary,

      detail,

      duration: 3000,

      createdAt: new Date(),
    };

    this.store.add(notification);

    switch (severity) {
      case TOAST_SEVERITY.SUCCESS:
        this.toastr.success(detail, summary);

        break;

      case TOAST_SEVERITY.ERROR:
        this.toastr.error(detail, summary);

        break;

      case TOAST_SEVERITY.INFO:
        this.toastr.info(detail, summary);

        break;

      case TOAST_SEVERITY.WARN:
        this.toastr.warning(detail, summary);

        break;
    }
  }

  public successCreate(): void {
    this.show(
      TOAST_SEVERITY.SUCCESS,
      APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_CREATE,
    );
  }

  public successUpdate(): void {
    this.show(
      TOAST_SEVERITY.SUCCESS,
      APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_UPDATE,
    );
  }

  public successDelete(): void {
    this.show(
      TOAST_SEVERITY.SUCCESS,
      APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_DELETE,
    );
  }

  public loadError(): void {
    this.show(TOAST_SEVERITY.ERROR, APP_CONSTANTS.TOAST_MESSAGES.ERROR_LOAD);
  }
}
