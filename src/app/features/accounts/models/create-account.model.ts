import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';

/**
 * Request payload for
 * creating an account.
 */
export interface CreateAccount {
  readonly accountNumber: string;

  readonly accountHolder: string;

  readonly accountType: AccountType;

  readonly balance: number;

  readonly status: AccountStatus;
}
