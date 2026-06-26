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

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [CommonModule, StatCardComponent],

  templateUrl: './dashboard.component.html',

  styleUrl: './dashboard.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  /**
   * Dashboard service.
   */
  private readonly dashboardService = inject(DashboardService);

  /**
   * Authentication store.
   */
  private readonly authStore = inject(AuthStore);

  /**
   * Logged-in user.
   */
  protected readonly currentUser = computed(() => this.authStore.user());

  /**
   * Dashboard statistic cards.
   */
  protected readonly statistics = signal<StatisticCard[]>([]);

  /**
   * Load dashboard data.
   */
  public ngOnInit(): void {
    this.loadDashboardSummary();
  }

  /**
   * Retrieves dashboard summary
   * from backend.
   */
  private loadDashboardSummary(): void {
    this.dashboardService.getSummary().subscribe({
      next: (summary) => {
        console.log('Dashboard Summary:', summary);

        this.statistics.set(this.mapSummaryToCards(summary));

        console.log('Statistics:', this.statistics());
      },

      error: (error) => {
        console.error(error);
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
}
