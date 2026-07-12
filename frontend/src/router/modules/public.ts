import type { RouteRecordRaw } from 'vue-router';

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/Landing.vue'),
    meta: {
      title: 'LUMORA - Next-Gen Learning Management System',
      layout: 'public',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: 'Log In - LUMORA',
      layout: 'auth',
      guestOnly: true,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/Signup.vue'),
    meta: {
      title: 'Sign Up - LUMORA',
      layout: 'auth',
      guestOnly: true,
    },
  },
  // Catch-all route to redirect invalid URLs to the 404 NotFound page
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: 'Page Not Found - LUMORA',
      layout: 'public',
      requiresAuth: false,
    },
  },
];
