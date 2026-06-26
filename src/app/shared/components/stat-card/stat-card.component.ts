import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StatisticCard } from '../../../features/dashboard/models/statistic-card.model';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  readonly card = input.required<StatisticCard>();
}
