import { CustomerStatus } from '../enums/customer-status.enum';
import { Gender } from '../enums/gender.enum';

export const CUSTOMER_CONSTANTS = {
  GENDERS: [
    {
      label: 'Male',
      value: Gender.MALE,
    },
    {
      label: 'Female',
      value: Gender.FEMALE,
    },
    {
      label: 'Other',
      value: Gender.OTHER,
    },
  ],

  STATUSES: [
    {
      label: 'Active',
      value: CustomerStatus.ACTIVE,
    },
    {
      label: 'Inactive',
      value: CustomerStatus.INACTIVE,
    },
    {
      label: 'Blocked',
      value: CustomerStatus.BLOCKED,
    },
  ],
} as const;
