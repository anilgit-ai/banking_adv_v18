import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';

import { StatisticCard } from '../../models/statistic-card.model';

import { AuthStore } from '../../../../store/auth/auth.store';
import { CardVariant } from '../../../../shared/enums/card-varient.enum';

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
      variant: CardVariant.PRIMARY,
    },

    {
      title: 'Accounts',
      value: 125,
      icon: 'pi pi-building-columns',
      variant: CardVariant.SUCCESS,
    },

    {
      title: 'Customers',
      value: 452,
      icon: 'pi pi-users',
      variant: CardVariant.PURPLE,
    },

    {
      title: 'Loans',
      value: 18,
      icon: 'pi pi-credit-card',
      variant: CardVariant.WARNING,
    },
  ];
}
