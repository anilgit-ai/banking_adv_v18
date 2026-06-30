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

import { DashboardViewModel } from '../../models/dashboard-view.model';

import { StatisticCard } from '../../models/statistic-card.model';
import { QuickAction } from '../../models/quick-action.model';

import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { ActionCardComponent } from '../../../../shared/components/action-card/action-card.component';
import { RecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions.component';

import { CardVariant } from '../../../../shared/enums/card-variant.enum';

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
  /**
   * Dashboard Service.
   */
  private readonly dashboardService = inject(DashboardService);

  /**
   * Auth Store.
   */
  private readonly authStore = inject(AuthStore);

  /**
   * Current user.
   */
  protected readonly currentUser = computed(() => this.authStore.user());

  /**
   * Dashboard data.
   */
  protected readonly dashboard = signal<DashboardViewModel | null>(null);

  /**
   * Statistics cards.
   */
  protected readonly statistics = signal<StatisticCard[]>([]);

  /**
   * Loading state.
   */
  protected readonly loading = signal(false);

  /**
   * Error state.
   */
  protected readonly hasError = signal(false);

  /**
   * Component initialization.
   */
  ngOnInit(): void {
    this.loadDashboard();
  }

  /**
   * Loads dashboard.
   */
  private loadDashboard(): void {
    this.loading.set(true);

    this.hasError.set(false);

    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        this.dashboard.set(dashboard);

        this.statistics.set(this.mapSummaryToCards(dashboard));

        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);

        this.hasError.set(true);
      },
    });
  }

  /**
   * Converts dashboard data
   * into statistic cards.
   */
  private mapSummaryToCards(dashboard: DashboardViewModel): StatisticCard[] {
    return [
      {
        title: 'Total Balance',
        value: `₹${dashboard.totalBalance.toLocaleString()}`,
        icon: 'pi pi-wallet',
        variant: CardVariant.PRIMARY,
      },

      {
        title: 'Accounts',
        value: dashboard.totalAccounts,
        icon: 'pi pi-building-columns',
        variant: CardVariant.SUCCESS,
      },

      {
        title: 'Customers',
        value: dashboard.totalCustomers,
        icon: 'pi pi-users',
        variant: CardVariant.PURPLE,
      },

      {
        title: 'Loans',
        value: dashboard.activeLoans,
        icon: 'pi pi-credit-card',
        variant: CardVariant.WARNING,
      },
    ];
  }

  /**
   * Quick actions.
   */
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
      title: 'Transactions',
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
