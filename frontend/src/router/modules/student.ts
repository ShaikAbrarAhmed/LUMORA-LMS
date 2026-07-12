import type { RouteRecordRaw } from 'vue-router';

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: 'Dashboard - LUMORA',
      layout: 'student',
      requiresAuth: true,
    },
  },
  {
    path: '/programs',
    name: 'programs',
    component: () => import('@/views/Programs.vue'),
    meta: {
      title: 'My Programs - LUMORA',
      layout: 'student',
      requiresAuth: true,
    },
  },
  {
    path: '/progress',
    name: 'progress',
    component: () => import('@/views/Progress.vue'),
    meta: {
      title: 'Track Progress - LUMORA',
      layout: 'student',
      requiresAuth: true,
    },
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('@/views/Notifications.vue'),
    meta: {
      title: 'Notifications - LUMORA',
      layout: 'student',
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: 'Profile Settings - LUMORA',
      layout: 'student',
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: 'System Settings - LUMORA',
      layout: 'student',
      requiresAuth: true,
    },
  },
];
