import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { AuthStore } from '../../../../store/auth/auth.store';

import { DashboardService } from '../../services/dashboard.service';

import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';

import { DashboardSummary } from '../../models/dashboard-summary.model';

import { StatisticCard } from '../../models/statistic-card.model';
import { CardVariant } from '../../../../shared/enums/card-variant.enum';
import { QuickAction } from '../../models/quick-action.model';
import { ActionCardComponent } from '../../../../shared/components/action-card/action-card.component';
import { RecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions.component';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    StatCardComponent,
    ActionCardComponent,
    RecentTransactionsComponent,
  ],

  templateUrl: './dashboard.component.html',

  styleUrl: './dashboard.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  // services and store
  private readonly dashboardService = inject(DashboardService);
  private readonly transactionService = inject(TransactionService);
  private readonly authStore = inject(AuthStore);
  //signals
  protected readonly currentUser = computed(() => this.authStore.user());
  protected readonly statistics = signal<StatisticCard[]>([]);
  protected readonly loading = signal(false);
  protected readonly hasError = signal(false);

  /**
   * Load dashboard data.
   */
  public ngOnInit(): void {
    this.loadDashboardSummary();
    this.loadRecentTransaction();
  }
  /**
   * Retrieves dashboard summary
   * from backend.
   */
  private loadDashboardSummary(): void {
    this.loading.set(true);
    this.hasError.set(false);
    this.dashboardService.getSummary().subscribe({
      next: (summary) => {
        this.statistics.set(this.mapSummaryToCards(summary));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.hasError.set(true);
      },
    });
  }
  //Recent transactions
  protected readonly transactions = signal<Transaction[]>([]);
  // Load transactions
  private loadRecentTransaction(): void {
    this.transactionService.getRecentTransactions().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
      error: () => {
        this.hasError.set(true);
      },
    });
  }
  /**
   * Converts backend response
   * into reusable statistic cards.
   */
  private mapSummaryToCards(summary: DashboardSummary): StatisticCard[] {
    return [
      {
        title: 'Total Balance',
        value: `₹${summary.totalBalance.toLocaleString()}`,
        icon: 'pi pi-wallet',
        variant: CardVariant.PRIMARY,
      },

      {
        title: 'Accounts',
        value: summary.totalAccounts,
        icon: 'pi pi-building-columns',
        variant: CardVariant.SUCCESS,
      },

      {
        title: 'Customers',
        value: summary.totalCustomers,
        icon: 'pi pi-users',
        variant: CardVariant.PURPLE,
      },

      {
        title: 'Loans',
        value: summary.activeLoans,
        icon: 'pi pi-credit-card',
        variant: CardVariant.WARNING,
      },
    ];
  }
  protected readonly quickActions: QuickAction[] = [
    {
      title: 'Accounts',

      icon: 'pi pi-building-columns',

      route: '/app/accounts',
    },

    {
      title: 'Customers',

      icon: 'pi pi-users',

      route: '/app/customers',
    },

    {
      title: 'Transfer',

      icon: 'pi pi-send',

      route: '/app/transactions',
    },

    {
      title: 'Reports',

      icon: 'pi pi-chart-bar',

      route: '/app/reports',
    },
  ];
}
