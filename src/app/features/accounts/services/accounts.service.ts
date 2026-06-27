import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';

import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService extends ApiService {
  /**
   * Retrieves all accounts.
   */
  public getAccounts(): Observable<Account[]> {
    return this.get<Account[]>(API_ENDPOINTS.ACCOUNTS.LIST);
  }
}
