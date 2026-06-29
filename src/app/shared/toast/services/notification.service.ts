import { Injectable, inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { v4 as uuid } from 'uuid';

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
  /**
   * Third-party toast library.
   */
  private readonly toastr = inject(ToastrService);

  /**
   * Stores notification history.
   *
   * In the future this can power:
   * - Notification Center
   * - Audit Logs
   * - Unread Notifications
   */
  private readonly notificationStore = inject(NotificationStore);

  /**
   * Displays a notification.
   *
   * Every notification in the application
   * eventually passes through this method.
   */
  public show(
    severity: TOAST_SEVERITY,
    message: string,
    title = 'Notification',
  ): void {
    const notification: NotificationMessage = {
      id: uuid(),

      severity,

      summary: title,

      detail: message,

      duration: 3000,

      createdAt: new Date(),
    };

    /**
     * Save notification history.
     */
    this.notificationStore.add(notification);

    /**
     * Display toast.
     */
    switch (severity) {
      case TOAST_SEVERITY.SUCCESS:
        this.toastr.success(message, title);

        break;

      case TOAST_SEVERITY.ERROR:
        this.toastr.error(message, title);

        break;

      case TOAST_SEVERITY.WARN:
        this.toastr.warning(message, title);

        break;

      case TOAST_SEVERITY.INFO:
        this.toastr.info(message, title);

        break;
    }
  }

  // ------------------------------------------------------------------
  // Generic Notifications
  // ------------------------------------------------------------------

  /**
   * Success notification.
   */
  public success(message: string, title = 'Success'): void {
    this.show(TOAST_SEVERITY.SUCCESS, message, title);
  }

  /**
   * Error notification.
   */
  public error(message: string, title = 'Error'): void {
    this.show(TOAST_SEVERITY.ERROR, message, title);
  }

  /**
   * Warning notification.
   */
  public warning(message: string, title = 'Warning'): void {
    this.show(TOAST_SEVERITY.WARN, message, title);
  }

  /**
   * Information notification.
   */
  public info(message: string, title = 'Information'): void {
    this.show(TOAST_SEVERITY.INFO, message, title);
  }

  // ------------------------------------------------------------------
  // Authentication
  // ------------------------------------------------------------------

  /**
   * Login successful.
   */
  public loginSuccess(): void {
    this.success(APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_LOGIN);
  }

  /**
   * Logout successful.
   */
  public logoutSuccess(): void {
    this.success(APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_LOGOUT);
  }

  /**
   * Invalid login credentials.
   */
  public invalidCredentials(): void {
    this.error(APP_CONSTANTS.TOAST_MESSAGES.INVALID_CREDENTIALS);
  }

  /**
   * User session expired.
   */
  public sessionExpired(): void {
    this.warning(APP_CONSTANTS.TOAST_MESSAGES.SESSION_EXPIRED);
  }

  /**
   * Unauthorized access.
   */
  public unauthorized(): void {
    this.error(APP_CONSTANTS.TOAST_MESSAGES.UNAUTHORIZED);
  }

  // ------------------------------------------------------------------
  // CRUD Operations
  // ------------------------------------------------------------------

  public successCreate(): void {
    this.success(APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_CREATE);
  }

  public successUpdate(): void {
    this.success(APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_UPDATE);
  }

  public successDelete(): void {
    this.success(APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_DELETE);
  }

  public createError(): void {
    this.error(APP_CONSTANTS.TOAST_MESSAGES.ERROR_CREATE);
  }

  public updateError(): void {
    this.error(APP_CONSTANTS.TOAST_MESSAGES.ERROR_UPDATE);
  }

  public deleteError(): void {
    this.error(APP_CONSTANTS.TOAST_MESSAGES.ERROR_DELETE);
  }

  public loadError(): void {
    this.error(APP_CONSTANTS.TOAST_MESSAGES.ERROR_LOAD);
  }

  // ------------------------------------------------------------------
  // Search
  // ------------------------------------------------------------------

  public searchSuccess(): void {
    this.success(APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_SEARCH);
  }

  public noResults(): void {
    this.info(APP_CONSTANTS.TOAST_MESSAGES.NO_RESULTS);
  }

  // ------------------------------------------------------------------
  // Generic Application Error
  // ------------------------------------------------------------------

  /**
   * Shows a generic application error.
   *
   * Useful inside HTTP interceptors.
   */
  public somethingWentWrong(): void {
    this.error(APP_CONSTANTS.TOAST_MESSAGES.SOMETHING_WENT_WRONG);
  }
  /**
 * Delete operation cancelled.
 */
public deleteCancelled(): void {
  this.info('Account deletion was cancelled.', 'Cancelled');
}
}
