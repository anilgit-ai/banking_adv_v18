import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';

import { HttpInterceptorFn } from '@angular/common/http';

import { NotificationService } from '../../shared/toast/services/notification.service';

/**
 * Centralized HTTP error handling.
 */
export const errorInterceptor: HttpInterceptorFn = (
  request,

  next,
) => {
  const notification = inject(NotificationService);

  return next(request).pipe(
    catchError((error) => {
      /**
       * Display friendly error.
       */
      notification.loadError();

      return throwError(() => error);
    }),
  );
};
