import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';
import { Customer } from '../models/customer.model';
import { CreateCustomer } from '../models/create-customer.model';
import { UpdateCustomer } from '../models/update-customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends ApiService {
  /**
   * Retrieves all customers.
   */
  public getCustomers(): Observable<Customer[]> {
    return this.get<Customer[]>(API_ENDPOINTS.CUSTOMERS.LIST);
  }

  /**
   * Retrieves customer by id.
   */
  public getCustomerById(id: string): Observable<Customer> {
    return this.get<Customer>(`${API_ENDPOINTS.CUSTOMERS.LIST}/${id}`);
  }

  /**
   * Creates a customer.
   */
  public createCustomer(customer: CreateCustomer): Observable<Customer> {
    return this.post<Customer>(API_ENDPOINTS.CUSTOMERS.LIST, customer);
  }

  /**
   * Updates customer.
   */
  public updateCustomer(
    id: string,
    customer: UpdateCustomer,
  ): Observable<Customer> {
    return this.put<Customer>(
      `${API_ENDPOINTS.CUSTOMERS.LIST}/${id}`,
      customer,
    );
  }
  /**
   * Deletes customer.
   */
  public deleteCustomer(id: string): Observable<void> {
    return this.delete<void>(`${API_ENDPOINTS.CUSTOMERS.LIST}/${id}`);
  }
}
