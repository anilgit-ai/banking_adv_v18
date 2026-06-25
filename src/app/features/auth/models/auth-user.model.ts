import { USER_ROLE } from '../../../core/constants/roles.constants';

export interface AuthUser {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: USER_ROLE;
  readonly token: string;
}
