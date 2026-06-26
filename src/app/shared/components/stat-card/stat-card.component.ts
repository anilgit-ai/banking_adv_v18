import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { StatisticCard } from '../../../features/dashboard/models/statistic-card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  readonly card = input.required<StatisticCard>();
  protected readonly cardClass = computed(() =>
  `stat-card--${this.card().variant}`
);
}
