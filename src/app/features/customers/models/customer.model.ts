import { CustomerStatus } from '../enums/customer-status.enum';
import { Gender } from '../enums/gender.enum';
export interface Customer {
  id: string;
  customerId: string;
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
