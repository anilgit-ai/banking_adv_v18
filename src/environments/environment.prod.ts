import { Environment } from '../app/core/models/environment.model';

export const environment: Environment = {
  production: true,

  apiUrl: 'https://api.bank.com',

  enableLogging: false,

  enableAnimations: true,

  toastDuration: 3000,

  featureFlags: {
    enableAuditLogs: true,

    enableFraudDetection: true,

    enableReportsExport: true,
  },
};
