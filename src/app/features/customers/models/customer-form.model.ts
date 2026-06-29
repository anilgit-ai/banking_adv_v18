import { FormControl } from '@angular/forms';

import { CustomerStatus } from '../enums/customer-status.enum';
import { Gender } from '../enums/gender.enum';

export interface CustomerForm {
  fullName: FormControl<string>;

  email: FormControl<string>;

  phoneNumber: FormControl<string>;

  gender: FormControl<Gender>;

  dateOfBirth: FormControl<Date | null>;

  aadhaarNumber: FormControl<string>;

  panNumber: FormControl<string>;

  address: FormControl<string>;

  status: FormControl<CustomerStatus>;
}
