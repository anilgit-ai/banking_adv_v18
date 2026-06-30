import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';

import { Loan } from '../models/loan.model';
import { CreateLoan } from '../models/create-loan.model';
import { UpdateLoan } from '../models/update-loan.model';

@Injectable({
  providedIn: 'root',
})
export class LoansService extends ApiService {
  /**
   * Retrieves all loans.
   */
  public getLoans(): Observable<Loan[]> {
    return this.get<Loan[]>(API_ENDPOINTS.LOANS.LIST);
  }

  /**
   * Retrieves a loan by identifier.
   */
  public getLoanById(id: string): Observable<Loan> {
    return this.get<Loan>(`${API_ENDPOINTS.LOANS.LIST}/${id}`);
  }

  /**
   * Creates a new loan.
   */
  public createLoan(loan: CreateLoan): Observable<Loan> {
    return this.post<Loan>(API_ENDPOINTS.LOANS.LIST, loan);
  }

  /**
   * Updates an existing loan.
   */
  public updateLoan(id: string, loan: UpdateLoan): Observable<Loan> {
    return this.put<Loan>(`${API_ENDPOINTS.LOANS.LIST}/${id}`, loan);
  }

  /**
   * Deletes a loan.
   */
  public deleteLoan(id: string): Observable<void> {
    return this.delete<void>(`${API_ENDPOINTS.LOANS.LIST}/${id}`);
  }
}
