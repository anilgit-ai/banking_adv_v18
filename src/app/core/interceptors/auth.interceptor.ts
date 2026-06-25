import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { StorageService } from '../services/storage.service';

import { STORAGE_KEYS } from '../constants/storage.constants';

/**
 * Automatically attaches JWT token
 * to every outgoing request.
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const storage = inject(StorageService);

  /**
   * Read token from storage.
   */
  const token = storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  /**
   * If token exists,
   * clone request and
   * add Authorization header.
   */
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(request);
};
