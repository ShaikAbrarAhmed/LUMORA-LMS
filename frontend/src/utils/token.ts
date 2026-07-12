/**
 * Token management utility to handle authentication tokens securely.
 * Provides a single source of truth for retrieving, storing, and removing tokens.
 */

const TOKEN_KEY = 'lumora_token';
const FRAPPE_TOKEN_KEY = 'token'; // Fallback token key often used by Frappe

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(FRAPPE_TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(FRAPPE_TOKEN_KEY);
};

export const hasToken = (): boolean => {
  return !!getToken();
};
