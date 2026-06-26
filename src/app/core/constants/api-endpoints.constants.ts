export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
  },

  USERS: '/users',

  ACCOUNTS: '/accounts',

  TRANSACTIONS: '/transactions',

  BENEFICIARIES: '/beneficiaries',

  LOANS: '/loans',

  REPORTS: '/reports',

  AUDIT_LOGS: '/auditLogs',
} as const;
