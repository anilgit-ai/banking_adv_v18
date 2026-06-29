export const ROUTES = {
  ROOT: 'app',

  AUTH: {
    ROOT: 'auth',
    LOGIN: 'login',
    REGISTER: 'register',
    FORGOT_PASSWORD: 'forgot-password',
  },

  APP: {
    DASHBOARD: 'dashboard',
    ACCOUNTS: 'accounts',
    CUSTOMERS: 'customers',
    TRANSACTIONS: 'transactions',
    TRANSFERS: 'transfers',
    BENEFICIARIES: 'beneficiaries',
    LOANS: 'loans',
    REPORTS: 'reports',
    ADMIN: 'admin',
    PROFILE: 'profile',
  },
} as const;
