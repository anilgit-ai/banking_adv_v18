export interface Environment {
  readonly production: boolean;
  readonly apiUrl: string;
  readonly enableLogging: boolean;
  readonly enableAnimations: boolean;
  readonly toastDuration: number;
  readonly featureFlags: {
    readonly enableAuditLogs: boolean;
    readonly enableFraudDetection: boolean;
    readonly enableReportsExport: boolean;
  };
}
