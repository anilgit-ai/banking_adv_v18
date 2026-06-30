export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
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
  LOANS: {
    LIST: '/loans',
  },
  USERS: '/users',
  BENEFICIARIES: '/beneficiaries',
  REPORTS: '/reports',
  AUDIT_LOGS: '/auditLogs',
} as const;
