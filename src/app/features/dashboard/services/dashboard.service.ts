import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';

import { DashboardSummary } from '../models/dashboard-summary.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends ApiService {
  /**
   * Retrieves dashboard summary.
   */
  public getSummary(): Observable<DashboardSummary> {
    return this.get<DashboardSummary>(API_ENDPOINTS.DASHBOARD.SUMMARY);
  }
}
