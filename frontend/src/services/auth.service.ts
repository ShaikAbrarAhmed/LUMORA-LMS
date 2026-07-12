import { api } from './api/axios';
import { API_ENDPOINTS } from '@/constants/api';
import type { LoginCredentials, SignupCredentials, AuthResponse, User } from '@/types/auth';
import { setToken, removeToken } from '@/utils/token';

export const authService = {
  /**
   * Authenticate a user and store their token.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.token) {
      setToken(response.token);
    }
    return response;
  },

  /**
   * Register a new user and authenticate them.
   */
  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, credentials);
    if (response.token) {
      setToken(response.token);
    }
    return response;
  },

  /**
   * Log out the current user by calling the API and clearing the token.
   */
  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.warn('[Auth Service] Logout endpoint failed, but proceeding to clear local session.', error);
    } finally {
      removeToken();
    }
  },

  /**
   * Refresh the active session JWT token.
   */
  async refresh(): Promise<string> {
    const response = await api.post<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH);
    if (response.token) {
      setToken(response.token);
    }
    return response.token;
  },

  /**
   * Fetch the currently authenticated user's profile.
   * Useful for restoring sessions on page reload.
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ message: string; data: User }>('/api/method/frappe.auth.get_logged_user');
    // Adapt depending on exact Frappe response structure. Usually Frappe wraps data in `message` or `data`
    // Returning response.data assuming standard Frappe API wrapper or typical REST fallback.
    return response.data || (response as unknown as User);
  }
};
