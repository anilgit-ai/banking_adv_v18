export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  DASHBOARD: {
    SUMMARY: '/dashboard',
  },
  ACCOUNTS: {
    LIST: '/accounts',
  },
  CUSTOMERS: {
    LIST: '/customers',
  },
  TRANSACTIONS: {
    LIST: '/transactions',
  },
  USERS: '/users',
  BENEFICIARIES: '/beneficiaries',
  LOANS: '/loans',
  REPORTS: '/reports',
  AUDIT_LOGS: '/auditLogs',
} as const;
