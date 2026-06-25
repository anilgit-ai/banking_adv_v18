/**
 * Keys used for browser storage.
 *
 * Keeping them in one place avoids
 * hardcoded strings throughout the application.
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',

  REFRESH_TOKEN: 'refresh_token',

  CURRENT_USER: 'current_user',
} as const;
