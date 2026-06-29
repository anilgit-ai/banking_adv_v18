import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';

import { Account } from '../models/account.model';

import { CreateAccount } from '../models/create-account.model';

import { UpdateAccount } from '../models/update-account.model';

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

  /**
   * Retrieves a single account
   * by its identifier.
   */
  public getAccountById(id: string): Observable<Account> {
    return this.get<Account>(`${API_ENDPOINTS.ACCOUNTS.LIST}/${id}`);
  }

  /**
   * Creates a new account.
   */
  public createAccount(account: CreateAccount): Observable<Account> {
    return this.post<Account>(API_ENDPOINTS.ACCOUNTS.LIST, account);
  }

  /**
   * Updates an existing account.
   */
  public updateAccount(
    id: string,
    account: UpdateAccount,
  ): Observable<Account> {
    return this.put<Account>(`${API_ENDPOINTS.ACCOUNTS.LIST}/${id}`, account);
  }

  /**
   * Deletes an account.
   */
  public deleteAccount(id: string): Observable<void> {
    return this.delete<void>(`${API_ENDPOINTS.ACCOUNTS.LIST}/${id}`);
  }
}
