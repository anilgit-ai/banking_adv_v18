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

import { Customer } from '../../models/customer.model';
import { CustomerStatus } from '../../enums/customer-status.enum';

import { HighlightPipe } from '../../../../shared/pipes/highlight.pipe';

@Component({
  selector: 'app-customer-table',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    HighlightPipe,
  ],

  templateUrl: './customer-table.component.html',

  styleUrl: './customer-table.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerTableComponent {
  /**
   * Customers.
   */
  readonly customers = input.required<Customer[]>();

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
  protected getSeverity(status: CustomerStatus): 'success' | 'warn' | 'danger' {
    switch (status) {
      case CustomerStatus.ACTIVE:
        return 'success';

      case CustomerStatus.INACTIVE:
        return 'warn';

      case CustomerStatus.BLOCKED:
        return 'danger';
    }
  }
}
