import { api } from './api/axios';
import { API_ENDPOINTS } from '@/constants/api';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

export const notificationService = {
  /**
   * Fetches active notifications for the logged-in student.
   */
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      return await api.get<NotificationItem[]>(API_ENDPOINTS.NOTIFICATIONS.LIST);
    } catch (error) {
      console.warn('[Notification Service] Fetching notifications failed, returning mocks.');
      return [
        {
          id: 'notif-1',
          title: 'Quiz Submitted Successfully',
          message: 'Your responses for SQL Optimization Quiz 1 have been graded.',
          isRead: false,
          type: 'success',
          timestamp: '2 hours ago',
        },
        {
          id: 'notif-2',
          title: 'System Maintenance Scheduled',
          message: 'LUMORA services will be offline for 30 minutes this Friday at 02:00 UTC.',
          isRead: false,
          type: 'warning',
          timestamp: '5 hours ago',
        },
        {
          id: 'notif-3',
          title: 'New Course Enrolled',
          message: 'You have been enrolled in UX Design Essentials by the Admin.',
          isRead: true,
          type: 'info',
          timestamp: '3 days ago',
        },
        {
          id: 'notif-4',
          title: 'Instructor Feedback Available',
          message: 'Dr. Connor left feedback on your Transformer Neural Network assignment.',
          isRead: true,
          type: 'info',
          timestamp: '1 week ago',
        },
      ];
    }
  },

  /**
   * Marks a notification as read.
   */
  async markAsRead(id: string): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.NOTIFICATIONS.MARK_READ, { notificationId: id });
    } catch (error) {
      console.warn(`[Notification Service] Marking notification ${id} as read failed on backend.`);
    }
  }
};
