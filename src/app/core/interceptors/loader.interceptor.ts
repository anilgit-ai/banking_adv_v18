import { finalize } from 'rxjs';

import { inject } from '@angular/core';

import { LoaderService } from '../services/loader.service';

import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Automatically controls
 * global loading indicator.
 */
export const loaderInterceptor: HttpInterceptorFn = (request, next) => {
  const loader = inject(LoaderService);

  /**
   * Show loader
   * before request starts.
   */
  loader.show();

  return next(request).pipe(
    /**
     * finalize() executes for
     * both success and error.
     */
    finalize(() => {
      loader.hide();
    }),
  );
};
