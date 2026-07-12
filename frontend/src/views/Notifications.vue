<template>
  <div class="space-y-6 text-left">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- Title Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-extrabold text-lumora-primary tracking-tight">Notifications</h1>
        <p class="text-sm text-lumora-secondary mt-1">
          Stay updated with announcements, system alerts, and instructor feedbacks.
        </p>
      </div>
      <Button v-if="notificationStore.notifications.length > 0" variant="secondary" @click="clearAll">
        <CheckCheckIcon class="w-4 h-4" />
        <span>Mark all read</span>
      </Button>
    </div>

    <!-- Notifications Content -->
    <div v-if="notificationStore.notifications.length > 0" class="space-y-3">
      <Card
        v-for="item in notificationStore.notifications"
        :key="item.id"
        padding="sm"
        class="flex gap-4 items-start border-l-2 hoverable text-left"
        :class="item.isRead ? 'border-l-lumora-accent/20 bg-lumora-surface/55' : 'border-l-lumora-accent bg-lumora-surface'"
        hoverable
      >
        <!-- Icon representation -->
        <div class="p-2.5 rounded-lg bg-lumora-accent/10 border border-lumora-accent/10 text-lumora-primary mt-0.5">
          <component :is="getIcon(item.type)" class="w-4 h-4" />
        </div>
        <div class="flex-grow space-y-1">
          <div class="flex items-center justify-between gap-2">
            <h4 class="text-sm font-bold text-lumora-primary" :class="{ 'opacity-70': item.isRead }">{{ item.title }}</h4>
            <span class="text-[10px] text-lumora-secondary font-mono">{{ item.timestamp }}</span>
          </div>
          <p class="text-xs text-lumora-secondary leading-relaxed">{{ item.message }}</p>
          <div class="pt-1 flex gap-2" v-if="!item.isRead">
            <Button variant="ghost" class="text-xs px-2.5 py-1" @click="notificationStore.markAsRead(item.id)">
              Mark read
            </Button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Empty State -->
    <EmptyState
      v-else
      title="All caught up!"
      description="You have no unread notifications or course updates at the moment."
      :icon="BellOffIcon"
    >
      <template #action>
        <Button variant="primary" @click="restoreNotifications">
          Reset Notifications
        </Button>
      </template>
    </EmptyState>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { 
  BellOff as BellOffIcon, 
  MessageSquare as MessageSquareIcon,
  AlertTriangle as AlertTriangleIcon, 
  CheckCheck as CheckCheckIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon
} from '@lucide/vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import EmptyState from '@/components/EmptyState.vue';

// Pinia Store Integration
import { useNotificationStore } from '@/stores/notification';

const notificationStore = useNotificationStore();

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Notifications' }
];

onMounted(async () => {
  // Load notifications from the store on page load
  await notificationStore.loadNotifications();
});

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircleIcon;
    case 'warning':
      return AlertTriangleIcon;
    case 'error':
      return AlertTriangleIcon;
    case 'info':
      return MessageSquareIcon;
    default:
      return InfoIcon;
  }
};

const clearAll = async () => {
  // Mark all unread notifications as read
  for (const n of notificationStore.notifications) {
    if (!n.isRead) {
      await notificationStore.markAsRead(n.id);
    }
  }
};

const restoreNotifications = async () => {
  await notificationStore.loadNotifications();
};
</script>
