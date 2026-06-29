import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';
export interface AccountFilter {
  readonly keyword?: string;
  readonly accountType?: AccountType;
  readonly status?: AccountStatus;
}