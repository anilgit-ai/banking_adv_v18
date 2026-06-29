import { CustomerStatus } from '../enums/customer-status.enum';
import { Gender } from '../enums/gender.enum';

/**
 * Payload used while creating
 * a new customer.
 */
export interface CreateCustomer {
  fullName: string;

  email: string;

  phoneNumber: string;

  gender: Gender;

  dateOfBirth: string;

  aadhaarNumber: string;

  panNumber: string;

  address: string;

  status: CustomerStatus;
}
