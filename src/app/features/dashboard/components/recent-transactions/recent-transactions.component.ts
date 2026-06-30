import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { TransactionType } from '../../../../shared/enums/transaction-type.enum';
import { Transactions } from '../../../transactions/models/transactions.model';



@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule],
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentTransactionsComponent {
  //recent transaction received from parent component
  readonly transactions = input.required<Transactions[]>();
  //expose enum to template
  protected readonly transactionType = TransactionType;
}
