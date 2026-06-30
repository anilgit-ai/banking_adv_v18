import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';
import { CreateTransaction } from '../models/create-transaction.model';
import { UpdateTransaction } from '../models/update-transaction.model';
import { Transactions } from '../models/transactions.model';
@Injectable({
  providedIn: 'root',
})
export class TransactionsService extends ApiService {
  /**
   * Retrieves all transactions.
   */
  public getTransactions(): Observable<Transactions[]> {
    return this.get<Transactions[]>(API_ENDPOINTS.TRANSACTIONS.LIST);
  }

  /**
   * Retrieves a transaction by id.
   */
  public getTransactionById(id: string): Observable<Transactions> {
    return this.get<Transactions>(`${API_ENDPOINTS.TRANSACTIONS.LIST}/${id}`);
  }

  /**
   * Creates a transaction.
   */
  public createTransaction(
    transaction: CreateTransaction,
  ): Observable<Transactions> {
    return this.post<Transactions>(API_ENDPOINTS.TRANSACTIONS.LIST, transaction);
  }

  /**
   * Updates a transaction.
   */
  public updateTransaction(
    id: string,
    transaction: UpdateTransaction,
  ): Observable<Transactions> {
    return this.put<Transactions>(
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
