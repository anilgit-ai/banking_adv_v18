import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-customer-filters',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './customer-filters.component.html',
  styleUrl: './customer-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFiltersComponent {
  /**
   * Search keyword.
   */
  readonly searchKeyword = input('');

  /**
   * Selected gender.
   */
  readonly selectedGender = input('');

  /**
   * Selected status.
   */
  readonly selectedStatus = input('');

  /**
   * Search event.
   */
  readonly searchKeywordChange = output<string>();

  /**
   * Gender event.
   */
  readonly genderChange = output<string>();

  /**
   * Status event.
   */
  readonly statusChange = output<string>();

  /**
   * Clear filters event.
   */
  readonly clearFilters = output<void>();

  /**
   * Gender options.
   */
  protected readonly genders = [
    {
      label: 'Gender Type',
      value: '',
    },
    {
      label: 'Male',
      value: 'MALE',
    },
    {
      label: 'Female',
      value: 'FEMALE',
    },
    {
      label: 'Other',
      value: 'OTHER',
    },
  ];

  /**
   * Customer status options.
   */
  protected readonly statuses = [
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
  ];
}
