import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-account-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, SelectModule,ButtonModule],
  templateUrl: './account-filters.component.html',
  styleUrl: './account-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFiltersComponent {
  // search keyword
  readonly searchKeyword = input('');
  readonly selectedAccountType = input('');
  // selected account status
  readonly selectedStatus = input('');
  // search event
  readonly searchKeywordChange = output<string>();
  // account type event
  readonly accountTypeChange = output<string>();
  // status event
  readonly statusChange = output<string>();
  // clear filters event
  readonly clearFilters = output<void>();
  // accounttype actions
  protected readonly accountTypes = [
    {
      label: 'Account types',
      value: '',
    },
    {
      label: 'Savings',
      value: 'SAVINGS',
    },
    {
      label: 'Current',
      value: 'CURRENT',
    },
    {
      label: 'Salary',
      value: 'SALARY',
    },
    {
      label: 'Fixed Deposit',
      value: 'FIXED_DEPOSIT',
    },
  ];

  /**
   * Status options.
   */
  protected readonly accountStatuses = [
    {
      label: 'Account Status',
      value: '',
    },
    {
      label: 'Active',
      value: 'ACTIVE',
    },
    {
      label: 'Inactive',
      value: 'INACTIVE',
    },
    {
      label: 'Blocked',
      value: 'BLOCKED',
    },
    {
      label: 'Closed',
      value: 'CLOSED',
    },
  ];
}
