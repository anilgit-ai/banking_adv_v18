import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';
import { Transaction } from '../models/transaction.model';
import { ApiService } from '../../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends ApiService {
  /**
   * Retrieves recent transactions.
   */
  public getRecentTransactions(): Observable<Transaction[]> {
    return this.get<Transaction[]>(API_ENDPOINTS.TRANSACTIONS.LIST);
  }
}
