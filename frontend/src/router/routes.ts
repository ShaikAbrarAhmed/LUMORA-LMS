import type { RouteRecordRaw } from 'vue-router';
import { publicRoutes } from './modules/public';
import { studentRoutes } from './modules/student';

/**
 * Route definitions for the LUMORA LMS application.
 * Routes are divided into modules for better maintainability:
 * - Public routes: public.ts (Landing, Login, Signup, 404)
 * - Student routes: student.ts (Dashboard, Programs, Progress, etc.)
 */
export const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...studentRoutes,
];
