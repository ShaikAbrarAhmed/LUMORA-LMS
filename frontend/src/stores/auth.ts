import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/auth.service';
import type { User, LoginCredentials, SignupCredentials } from '@/types/auth';
import { hasToken } from '@/utils/token';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  
  const isReady = ref<boolean>(false); // Used to delay app rendering until session check is complete

  /**
   * Action to log in.
   */
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await authService.login(credentials);
      isAuthenticated.value = true;
      if (response.user) {
        user.value = response.user;
      } else {
        // If the login endpoint doesn't return user details, fetch them explicitly
        user.value = await authService.getCurrentUser();
      }
    } catch (err: any) {
      error.value = err.message || 'Login failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Action to sign up.
   */
  const signup = async (credentials: SignupCredentials) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await authService.signup(credentials);
      isAuthenticated.value = true;
      if (response.user) {
        user.value = response.user;
      } else {
        user.value = await authService.getCurrentUser();
      }
    } catch (err: any) {
      error.value = err.message || 'Signup failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Action to log out.
   */
  const logout = async () => {
    isLoading.value = true;
    try {
      await authService.logout();
    } catch (err) {
      console.error('[Auth Store] Logout error:', err);
    } finally {
      isAuthenticated.value = false;
      user.value = null;
      isLoading.value = false;
    }
  };

  /**
   * Initialize session on app startup.
   * Checks for token and restores the user profile if present.
   */
  const initAuth = async () => {
    if (!hasToken()) {
      isAuthenticated.value = false;
      user.value = null;
      isReady.value = true;
      return;
    }

    try {
      user.value = await authService.getCurrentUser();
      isAuthenticated.value = true;
    } catch (err) {
      console.warn('[Auth Store] Failed to restore session. Clearing invalid token.', err);
      await authService.logout(); // Clears the invalid token
      isAuthenticated.value = false;
      user.value = null;
    } finally {
      isReady.value = true;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isReady,
    login,
    signup,
    logout,
    initAuth,
  };
});
