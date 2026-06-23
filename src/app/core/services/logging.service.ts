import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  public log(message: string, data?: unknown): void {
    if (!environment.enableLogging) {
      return;
    }
    console.log(message, data);
  }
  public error(message: string, error?: unknown): void {
    if (!environment.enableLogging) {
      return;
    }
    console.error(message, error);
  }
  public warn(message: string): void {
    if (!environment.enableLogging) {
      return;
    }
    console.warn(message);
  }
}
