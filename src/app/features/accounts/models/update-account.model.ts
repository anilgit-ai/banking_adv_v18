import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';

/**
 * Request payload for
 * updating an account.
 */
export interface UpdateAccount {
  readonly accountNumber: string;

  readonly accountHolder: string;

  readonly accountType: AccountType;

  readonly balance: number;

  readonly status: AccountStatus;
}
