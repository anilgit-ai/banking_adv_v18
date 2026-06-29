import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { Account } from '../../models/account.model';
import { AccountStatus } from '../../enums/account-status.enum';

import { HighlightPipe } from '../../../../shared/pipes/highlight.pipe';

@Component({
  selector: 'app-account-table',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    HighlightPipe,
  ],

  templateUrl: './account-table.component.html',

  styleUrl: './account-table.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountTableComponent {
  /**
   * Accounts.
   */
  readonly accounts = input.required<Account[]>();

  /**
   * Search keyword.
   */
  readonly searchKeyword = input('');

  /**
   * Delete event.
   */
  readonly delete = output<string>();

  /**
   * Returns tag severity.
   */
  protected getSeverity(
    status: AccountStatus,
  ): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case AccountStatus.ACTIVE:
        return 'success';

      case AccountStatus.INACTIVE:
        return 'warn';

      case AccountStatus.BLOCKED:
        return 'danger';

      case AccountStatus.CLOSED:
        return 'info';

      default:
        return 'info';
    }
  }
}
