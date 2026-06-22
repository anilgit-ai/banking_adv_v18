import { USER_ROLE } from '../constants/roles.constants';

export interface User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly role: USER_ROLE;
  readonly isActive: boolean;
}
