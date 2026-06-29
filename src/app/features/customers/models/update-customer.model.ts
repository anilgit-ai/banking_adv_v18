import { CustomerStatus } from '../enums/customer-status.enum';
import { Gender } from '../enums/gender.enum';

/**
 * Payload used while updating
 * an existing customer.
 */
export interface UpdateCustomer {
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
