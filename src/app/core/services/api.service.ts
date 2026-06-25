import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

/**
 * Base API service.
 *
 * Every feature service will extend this.
 *
 * Example:
 *
 * AuthService
 * AccountsService
 * LoansService
 * DashboardService
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * Angular HttpClient.
   */
  protected readonly http = inject(HttpClient);

  /**
   * Base URL from environment.
   */
  protected readonly apiUrl = environment.apiUrl;

  /**
   * GET request.
   */
  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`);
  }

  /**
   * POST request.
   */
  protected post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body);
  }

  /**
   * PUT request.
   */
  protected put<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, body);
  }

  /**
   * DELETE request.
   */
  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`);
  }
}
