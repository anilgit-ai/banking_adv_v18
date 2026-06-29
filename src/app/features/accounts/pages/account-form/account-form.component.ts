import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

import { AccountStatus } from '../../enums/account-status.enum';
import { AccountType } from '../../enums/account-type.enum';

@Component({
  selector: 'app-account-form',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
  ],

  templateUrl: './account-form.component.html',

  styleUrl: './account-form.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent {
  /**
   * Reactive form received
   * from parent component.
   */
  readonly form = input.required<FormGroup>();

  /**
   * Account types.
   */
  protected readonly accountTypes = [
    {
      label: 'Savings',
      value: AccountType.SAVINGS,
    },
    {
      label: 'Current',
      value: AccountType.CURRENT,
    },
    {
      label: 'Fixed Deposit',
      value: AccountType.FIXED_DEPOSIT,
    },
  ];

  /**
   * Account statuses.
   */
  protected readonly accountStatuses = [
    {
      label: 'Active',
      value: AccountStatus.ACTIVE,
    },
    {
      label: 'Inactive',
      value: AccountStatus.INACTIVE,
    },
    {
      label: 'Blocked',
      value: AccountStatus.BLOCKED,
    },
    {
      label: 'Closed',
      value: AccountStatus.CLOSED,
    },
  ];
}
