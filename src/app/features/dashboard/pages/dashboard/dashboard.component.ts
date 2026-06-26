import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';

import { StatisticCard } from '../../models/statistic-card.model';

import { AuthStore } from '../../../../store/auth/auth.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  /**
   * Global authentication state.
   */
  private readonly authStore = inject(AuthStore);

  /**
   * Logged-in user.
   */
  protected readonly currentUser = computed(() => this.authStore.user());

  /**
   * Dashboard statistics.
   *
   * Temporary mock data.
   * Next step:
   * Replace with DashboardService.
   */
  protected readonly statistics: StatisticCard[] = [
    {
      title: 'Total Balance',
      value: '₹2,50,000',
      icon: 'pi pi-wallet',
      backgroundColor: '#2563eb',
      iconColor: '#ffffff',
    },

    {
      title: 'Accounts',
      value: 125,
      icon: 'pi pi-building-columns',
      backgroundColor: '#059669',
      iconColor: '#ffffff',
    },

    {
      title: 'Customers',
      value: 452,
      icon: 'pi pi-users',
      backgroundColor: '#7c3aed',
      iconColor: '#ffffff',
    },

    {
      title: 'Loans',
      value: 18,
      icon: 'pi pi-credit-card',
      backgroundColor: '#ea580c',
      iconColor: '#ffffff',
    },
  ];
}
