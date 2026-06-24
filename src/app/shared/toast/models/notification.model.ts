import { TOAST_SEVERITY } from '../../../core/constants/app.constants';

export interface NotificationMessage {
  readonly id: string;

  readonly severity: TOAST_SEVERITY;

  readonly summary: string;

  readonly detail: string;

  readonly duration: number;

  readonly createdAt: Date;
}
