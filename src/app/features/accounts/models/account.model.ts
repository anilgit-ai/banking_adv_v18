import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';
export interface Account {
  readonly id: string;
  readonly accountNumber: string;
  readonly accountHolder: string;
  readonly accountType: AccountType;
  readonly balance: number;
  readonly status: AccountStatus;
}
