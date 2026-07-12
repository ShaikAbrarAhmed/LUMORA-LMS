import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { setupAuthGuards } from './guards';

/**
 * Vue Router instance for the LUMORA LMS frontend application.
 * Utilizes HTML5 History Mode for clean, slash-based URLs (/dashboard instead of /#/dashboard).
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Custom scroll behavior to improve User Experience (UX) during page transitions
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 };
  },
});

// Attach global navigation guards for authentication
setupAuthGuards(router);

export default router;

