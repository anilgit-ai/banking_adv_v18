import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CustomersService } from '../../../customers/services/customers.service';
import { NotificationService } from '../../../../shared/toast/services/notification.service';
import { LoanFormComponent } from '../../components/loan-form/loan-form.component';
import { Customer } from '../../../customers/models/customer.model';
import { LoanStatus } from '../../enums/loan-status.enum';
import { LoanType } from '../../enums/loan-type.enum';
import { Loan } from '../../models/loan.model';
import { LoansService } from '../../service/loans.service';
import { CreateLoan } from '../../models/create-loan.model';
@Component({
  selector: 'app-create-loan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, LoanFormComponent],
  templateUrl: './create-loan.component.html',
  styleUrl: './create-loan.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateLoanComponent implements OnInit {
  /**
   * Form Builder.
   */
  private readonly fb = inject(FormBuilder);
  /**
   * Customers Service.
   */
  private readonly customersService = inject(CustomersService);
  /**
   * Loans Service.
   */
  private readonly loansService = inject(LoansService);
  /**
   * Router.
   */
  private readonly router = inject(Router);
  /**
   * Notification Service.
   */
  private readonly notificationService = inject(NotificationService);
  /**
   * Customers.
   */
  protected readonly customers = signal<Customer[]>([]);
  /**
   * Loading state.
   */
  protected readonly loading = signal(true);
  /**
   * Saving state.
   */
  protected readonly saving = signal(false);
  /**
   * Loan Form.
   */
  protected readonly loanForm = this.fb.nonNullable.group({
    customerId: ['', Validators.required],
    loanType: [LoanType.HOME, Validators.required],
    principalAmount: [0, [Validators.required, Validators.min(1000)]],
    interestRate: [8.5, [Validators.required, Validators.min(1)]],
    tenureMonths: [12, [Validators.required, Validators.min(1)]],
    emiAmount: [0],
    startDate: [new Date(), Validators.required],
    endDate: [new Date()],
    outstandingBalance: [0],
    status: [LoanStatus.PENDING, Validators.required],
    remarks: [''],
  });
  /**
   * Component initialization.
   */
  ngOnInit(): void {
    this.loadCustomers();
    this.registerCalculationHandlers();
  }
  /**
   * Loads customers.
   */
  private loadCustomers(): void {
    this.loading.set(true);
    this.customersService.getCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.loadError();
        this.router.navigate(['/app/loans']);
      },
    });
  }
  /**
   * Registers form calculations.
   */
  private registerCalculationHandlers(): void {
    this.loanForm.valueChanges.subscribe(() => {
      this.calculateLoan();
    });
    this.calculateLoan();
  }
  /**
   * Calculates loan values.
   */
  private calculateLoan(): void {
    const principal = this.loanForm.controls.principalAmount.value;
    const rate = this.loanForm.controls.interestRate.value;
    const tenure = this.loanForm.controls.tenureMonths.value;
    const startDate = this.loanForm.controls.startDate.value;
    if (principal <= 0 || rate <= 0 || tenure <= 0) {
      return;
    }
    const emi = this.calculateEmi(principal, rate, tenure);
    const endDate = this.calculateEndDate(startDate, tenure);
    this.loanForm.patchValue(
      {
        emiAmount: emi,
        outstandingBalance: principal,
        endDate,
      },
      {
        emitEvent: false,
      },
    );
  }
  /**
   * Calculates EMI.
   */
  private calculateEmi(
    principal: number,
    annualRate: number,
    tenure: number,
  ): number {
    const monthlyRate = annualRate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Number(emi.toFixed(2));
  }
  /**
   * Calculates end date.
   */
  private calculateEndDate(startDate: Date, tenure: number): Date {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + tenure);
    return endDate;
  }
  /**
   * Creates a loan.
   */
  protected createLoan(): void {
    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.loansService.getLoans().subscribe({
      next: (loans) => {
        const formValue = this.loanForm.getRawValue();
        const loan: CreateLoan = {
          loanNumber: this.generateLoanNumber(loans),
          customerId: formValue.customerId,
          loanType: formValue.loanType,
          principalAmount: formValue.principalAmount,
          interestRate: formValue.interestRate,
          tenureMonths: formValue.tenureMonths,
          emiAmount: formValue.emiAmount,
          startDate: formValue.startDate.toISOString().split('T')[0],
          endDate: formValue.endDate.toISOString().split('T')[0],
          outstandingBalance: formValue.outstandingBalance,
          status: formValue.status,
          remarks: formValue.remarks.trim(),
        };
        this.loansService.createLoan(loan).subscribe({
          next: () => {
            this.saving.set(false);
            this.notificationService.successCreate();
            this.resetForm();
            this.router.navigate(['/app/loans']);
          },
          error: () => {
            this.saving.set(false);
            this.notificationService.createError();
          },
        });
      },
      error: () => {
        this.saving.set(false);
        this.notificationService.loadError();
      },
    });
  }
  /**
   * Generates the next loan number.
   */
  private generateLoanNumber(loans: Loan[]): string {
    if (loans.length === 0) {
      return 'LN100001';
    }
    const highestNumber = Math.max(
      ...loans.map((loan) => Number(loan.loanNumber.replace('LN', ''))),
    );
    return `LN${String(highestNumber + 1).padStart(6, '0')}`;
  }
  /**
   * Resets the form after
   * successful creation.
   */
  private resetForm(): void {
    this.loanForm.reset({
      customerId: '',
      loanType: LoanType.HOME,
      principalAmount: 0,
      interestRate: 8.5,
      tenureMonths: 12,
      emiAmount: 0,
      startDate: new Date(),
      endDate: new Date(),
      outstandingBalance: 0,
      status: LoanStatus.PENDING,
      remarks: '',
    });
    this.calculateLoan();
  }
  /**
   * Cancels loan creation.
   */
  protected cancel(): void {
    this.router.navigate(['/app/loans']);
  }
}
