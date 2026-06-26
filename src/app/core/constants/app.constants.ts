/**
 * Application-wide constants.
 *
 * Centralizing reusable strings and values
 * avoids magic strings throughout the project.
 */
export const APP_CONSTANTS = {
  /**
   * Form validation messages.
   */
  VALIDATION_MESSAGES: {
    REQUIRED: 'This field is required',

    INVALID_EMAIL: 'Please enter a valid email address',

    INVALID_PASSWORD: 'Please enter a valid password',

    MIN_LENGTH: (length: number): string =>
      `Minimum ${length} characters required`,

    MAX_LENGTH: (length: number): string =>
      `Maximum ${length} characters allowed`,
  },

  /**
   * Toast / Notification messages.
   */
  TOAST_MESSAGES: {
    // Authentication
    SUCCESS_LOGIN: 'Login successful.',

    SUCCESS_LOGOUT: 'Logout successful.',

    INVALID_CREDENTIALS: 'Invalid email or password.',

    SESSION_EXPIRED: 'Your session has expired. Please login again.',

    UNAUTHORIZED: 'You are not authorized to access this resource.',

    // CRUD Operations
    SUCCESS_CREATE: 'Record created successfully.',

    SUCCESS_UPDATE: 'Record updated successfully.',

    SUCCESS_DELETE: 'Record deleted successfully.',

    ERROR_CREATE: 'Failed to create record.',

    ERROR_UPDATE: 'Failed to update record.',

    ERROR_DELETE: 'Failed to update record.',

    ERROR_LOAD: 'Failed to load data.',

    // Search
    SUCCESS_SEARCH: 'Search completed successfully.',

    NO_RESULTS: 'No records found.',

    // Generic
    SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
  },

  /**
   * Generic application status messages.
   */
  STATUS: {
    LOADING: 'Loading...',

    NO_DATA: 'No data available.',

    ERROR: 'An unexpected error occurred.',
  },

  /**
   * Animation timings (milliseconds).
   */
  ANIMATION_TIMING: {
    FAST: 200,

    NORMAL: 300,

    SLOW: 500,
  },

  /**
   * Debounce timings (milliseconds).
   */
  DEBOUNCE_TIMES: {
    SEARCH: 300,

    INPUT: 500,

    BUTTON_CLICK: 1000,
  },
} as const;

/**
 * Supported notification severities.
 *
 * Used by NotificationService.
 */
export enum TOAST_SEVERITY {
  SUCCESS = 'success',

  INFO = 'info',

  WARN = 'warn',

  ERROR = 'error',
}
