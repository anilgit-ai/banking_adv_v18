import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';

import { Transaction } from '../models/transaction.model';

import { CreateTransaction } from '../models/create-transaction.model';

import { UpdateTransaction } from '../models/update-transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService extends ApiService {
  /**
   * Retrieves all transactions.
   */
  public getTransactions(): Observable<Transaction[]> {
    return this.get<Transaction[]>(API_ENDPOINTS.TRANSACTIONS.LIST);
  }

  /**
   * Retrieves a transaction by id.
   */
  public getTransactionById(id: string): Observable<Transaction> {
    return this.get<Transaction>(`${API_ENDPOINTS.TRANSACTIONS.LIST}/${id}`);
  }

  /**
   * Creates a transaction.
   */
  public createTransaction(
    transaction: CreateTransaction,
  ): Observable<Transaction> {
    return this.post<Transaction>(API_ENDPOINTS.TRANSACTIONS.LIST, transaction);
  }

  /**
   * Updates a transaction.
   */
  public updateTransaction(
    id: string,
    transaction: UpdateTransaction,
  ): Observable<Transaction> {
    return this.put<Transaction>(
      `${API_ENDPOINTS.TRANSACTIONS.LIST}/${id}`,
      transaction,
    );
  }

  /**
   * Deletes a transaction.
   */
  public deleteTransaction(id: string): Observable<void> {
    return this.delete<void>(`${API_ENDPOINTS.TRANSACTIONS.LIST}/${id}`);
  }
}
