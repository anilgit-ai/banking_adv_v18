import { Transaction } from "../../transactions/models/transaction.model";


export interface DashboardViewModel {
  /**
   * Total balance of all accounts.
   */
  totalBalance: number;

  /**
   * Total number of accounts.
   */
  totalAccounts: number;

  /**
   * Total number of customers.
   */
  totalCustomers: number;

  /**
   * Total active loans.
   */
  activeLoans: number;

  /**
   * Recent transactions.
   */
  recentTransactions: Transaction[];
}
