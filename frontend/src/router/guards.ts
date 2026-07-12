import type { Router } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

/**
 * Attaches authentication and navigation guards to the Vue Router instance.
 * @param router - The Vue Router instance
 */
export const setupAuthGuards = (router: Router) => {
  router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore();

    // Dynamically set the document title
    if (to.meta.title) {
      document.title = to.meta.title as string;
    }

    // Ensure session is restored before navigating if the app just loaded
    if (!authStore.isReady) {
      await authStore.initAuth();
    }

    const isAuthenticated = authStore.isAuthenticated;

    // Handle Protected Routes
    if (to.meta.requiresAuth && !isAuthenticated) {
      return next({ name: 'login', query: { redirect: to.fullPath } });
    }

    // Handle Guest-Only Routes (e.g., Login, Signup)
    if (to.meta.guestOnly && isAuthenticated) {
      return next({ name: 'dashboard' }); // Redirect authenticated users away from guest pages
    }

    // Proceed to requested route
    next();
  });
};
