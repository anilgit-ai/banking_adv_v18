import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { APP_CONSTANTS } from '../../core/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toastr: ToastrService) {}
  public success(message: string): void {
    this.toastr.success(message);
  }
  public error(message: string): void {
    this.toastr.error(message);
  }
  public info(message: string): void {
    this.toastr.info(message);
  }
  public warning(message: string): void {
    this.toastr.warning(message);
  }
  public successCreate(): void {
    this.success(APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_CREATE);
  }
  public successUpdate(): void {
    this.success(APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_UPDATE);
  }
  public successDelete(): void {
    this.success(APP_CONSTANTS.TOAST_MESSAGES.SUCCESS_DELETE);
  }
}
