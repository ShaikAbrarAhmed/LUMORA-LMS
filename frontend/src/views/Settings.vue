<template>
  <div class="space-y-6 text-left">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- Title Header -->
    <div>
      <h1 class="text-3xl font-extrabold text-lumora-primary tracking-tight">Account Settings</h1>
      <p class="text-sm text-lumora-secondary mt-1">
        Configure your security, application theme, and email notification choices.
      </p>
    </div>

    <!-- Tabs Container -->
    <Tabs v-model="activeTab" :tabs="tabOptions">
      <!-- Account Tab -->
      <div v-if="activeTab === 'account'">
        <Card padding="md" class="space-y-6">
          <div>
            <h3 class="text-base font-bold text-lumora-primary">General Preferences</h3>
            <p class="text-xs text-lumora-secondary mt-0.5">Customize your general portal layout parameters.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label class="text-xs font-semibold text-lumora-primary tracking-wider uppercase mb-2 block">Application Theme</label>
              <Dropdown v-model="selectedTheme" :options="themeOptions" />
            </div>
            <div>
              <label class="text-xs font-semibold text-lumora-primary tracking-wider uppercase mb-2 block">Timezone</label>
              <Dropdown v-model="selectedTimezone" :options="timezoneOptions" />
            </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-lumora-accent/10">
            <Button variant="primary" :disabled="profileStore.isLoading" @click="savePreferences">
              <span v-if="profileStore.isLoading">Saving...</span>
              <span v-else>Save Preferences</span>
            </Button>
          </div>
        </Card>
      </div>

      <!-- Security Tab -->
      <div v-if="activeTab === 'security'">
        <Card padding="md" class="space-y-6">
          <div>
            <h3 class="text-base font-bold text-lumora-primary">Password Configurations</h3>
            <p class="text-xs text-lumora-secondary mt-0.5">Ensure your portal account remains fully secure.</p>
          </div>

          <div class="space-y-4 pt-2">
            <div class="max-w-md">
              <Input v-model="currentPassword" type="password" label="Current Password" placeholder="••••••••" />
            </div>
            <div class="max-w-md">
              <Input v-model="newPassword" type="password" label="New Password" placeholder="••••••••" />
            </div>
            <div class="max-w-md">
              <Input v-model="confirmNewPassword" type="password" label="Confirm New Password" placeholder="••••••••" />
            </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-lumora-accent/10">
            <Button variant="primary" @click="updatePassword">Update Password</Button>
          </div>
        </Card>
      </div>

      <!-- Notifications Tab -->
      <div v-if="activeTab === 'notifications'">
        <Card padding="md" class="space-y-6">
          <div>
            <h3 class="text-base font-bold text-lumora-primary">Email Notifications</h3>
            <p class="text-xs text-lumora-secondary mt-0.5">Control when and what updates get emailed to your inbox.</p>
          </div>

          <div class="space-y-4 pt-2">
            <label class="flex items-start gap-3 text-sm text-lumora-primary cursor-pointer select-none">
              <input type="checkbox" checked class="accent-lumora-accent rounded border-lumora-accent/25 bg-lumora-surface mt-1" />
              <div>
                <p class="font-semibold">Course Announcements</p>
                <p class="text-xs text-lumora-secondary">Get emails when instructors post announcements or assignment updates.</p>
              </div>
            </label>

            <label class="flex items-start gap-3 text-sm text-lumora-primary cursor-pointer select-none">
              <input type="checkbox" checked class="accent-lumora-accent rounded border-lumora-accent/25 bg-lumora-surface mt-1" />
              <div>
                <p class="font-semibold">Weekly Progress Reports</p>
                <p class="text-xs text-lumora-secondary">Receive a summary of study times and completion milestones every Monday.</p>
              </div>
            </label>

            <label class="flex items-start gap-3 text-sm text-lumora-primary cursor-pointer select-none">
              <input type="checkbox" class="accent-lumora-accent rounded border-lumora-accent/25 bg-lumora-surface mt-1" />
              <div>
                <p class="font-semibold">Marketing & System Updates</p>
                <p class="text-xs text-lumora-secondary">Get notified of platform features, new academic degrees, and guides.</p>
              </div>
            </label>
          </div>

          <div class="flex justify-end pt-4 border-t border-lumora-accent/10">
            <Button variant="primary" @click="saveNotificationSettings">Save Preferences</Button>
          </div>
        </Card>
      </div>
    </Tabs>

    <Toast :show="showToast" :message="toastMessage" type="success" @close="showToast = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Tabs from '@/components/Tabs.vue';
import Card from '@/components/Card.vue';
import Dropdown from '@/components/Dropdown.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import Toast from '@/components/Toast.vue';

// Pinia Store Integration
import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Settings' }
];

const activeTab = ref('account');

const tabOptions = [
  { id: 'account', label: 'Account Preferences' },
  { id: 'security', label: 'Security & Access' },
  { id: 'notifications', label: 'Email Notifications' }
];

const selectedTheme = ref('dark');
const themeOptions = [
  { value: 'dark', label: 'Lumora Dark Theme (Official)' },
  { value: 'system', label: 'System Defaults' }
];

const selectedTimezone = ref('utc');
const timezoneOptions = [
  { value: 'utc', label: 'UTC (Universal Coordinated Time)' },
  { value: 'est', label: 'EST (Eastern Standard Time)' },
  { value: 'ist', label: 'IST (Indian Standard Time)' }
];

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const showToast = ref(false);
const toastMessage = ref('Preferences updated successfully!');

const syncTimezone = () => {
  if (profileStore.profile?.timezone) {
    selectedTimezone.value = profileStore.profile.timezone;
  }
};

onMounted(async () => {
  await profileStore.fetchProfile();
  syncTimezone();
});

watch(() => profileStore.profile, () => {
  syncTimezone();
}, { deep: true });

const savePreferences = async () => {
  try {
    await profileStore.updateProfile({
      timezone: selectedTimezone.value
    });
    toastMessage.value = 'General preferences saved successfully!';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  } catch (error) {
    console.error('Failed to save general settings:', error);
  }
};

const updatePassword = () => {
  currentPassword.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
  toastMessage.value = 'Password updated successfully!';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const saveNotificationSettings = () => {
  toastMessage.value = 'Notification preferences updated!';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};
</script>
