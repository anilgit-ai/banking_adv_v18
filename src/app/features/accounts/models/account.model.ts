import { AccountStatus } from '../enums/account-status.enum';
export interface Account {
  readonly id: string;
  readonly accountNumber: string;
  readonly accountHolder: string;
  readonly accountType: string;
  readonly balance: number;
  readonly status: AccountStatus;
}
