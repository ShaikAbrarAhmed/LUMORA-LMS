/**
 * Backend API Endpoint Constants for the LUMORA LMS.
 * Maps endpoints to standard Frappe LMS RPC-style methods.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/method/frappe.auth.login',
    SIGNUP: '/method/lumora.api.signup',
    LOGOUT: '/method/logout',
    REFRESH: '/method/frappe.auth.refresh',
    ME: '/method/frappe.auth.get_user_info'
  },
  DASHBOARD: {
    SUMMARY: '/method/lumora.api.get_dashboard_summary',
    ACTIVITY: '/method/lumora.api.get_recent_activity'
  },
  PROGRAMS: {
    LIST: '/method/lumora.api.get_programs',
    DETAILS: (id: string) => `/method/lumora.api.get_program_details?name=${id}`,
    SEARCH: '/method/lumora.api.search_programs'
  },
  NOTIFICATIONS: {
    LIST: '/method/lumora.api.get_notifications',
    MARK_READ: '/method/lumora.api.mark_notification_as_read'
  },
  QUIZ: {
    GET: (id: string) => `/method/lumora.api.get_quiz?name=${id}`,
    SUBMIT: '/method/lumora.api.submit_quiz'
  },
  ANALYTICS: {
    PROGRESS: '/method/lumora.api.get_student_progress',
    PERFORMANCE: '/method/lumora.api.get_performance_stats'
  },
  PROFILE: {
    GET: '/method/lumora.api.get_profile',
    UPDATE: '/method/lumora.api.update_profile'
  }
} as const;
