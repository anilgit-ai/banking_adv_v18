import { Environment } from '../app/core/models/environment.model';

export const environment: Environment = {
  production: false,

  apiUrl: 'http://localhost:3000',

  enableLogging: true,

  enableAnimations: true,

  toastDuration: 3000,

  featureFlags: {
    enableAuditLogs: true,

    enableFraudDetection: true,

    enableReportsExport: true,
  },
};
