import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuickAction } from '../../../features/dashboard/models/quick-action.model';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './action-card.component.html',
  styleUrl: './action-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardComponent {
  readonly action = input.required<QuickAction>();
}
