import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { notificationService, type NotificationItem } from '@/services/notification.service';

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<NotificationItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Getter returning the dynamic reactive count of unread notifications.
   */
  const unreadCount = computed(() => {
    return notifications.value.filter(n => !n.isRead).length;
  });

  /**
   * Loads notifications from the service.
   */
  const loadNotifications = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      notifications.value = await notificationService.getNotifications();
    } catch (err: any) {
      error.value = err.message || 'Failed to load notifications';
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Action to mark an alert as read on the backend and client.
   */
  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      const index = notifications.value.findIndex(n => n.id === id);
      if (index !== -1) {
        notifications.value[index].isRead = true;
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to update notification state';
    }
  };

  return {
    notifications,
    isLoading,
    error,
    unreadCount,
    loadNotifications,
    markAsRead,
  };
});
