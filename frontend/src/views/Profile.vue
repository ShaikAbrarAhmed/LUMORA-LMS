<template>
  <div class="space-y-6 text-left">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- Title Header -->
    <div>
      <h1 class="text-3xl font-extrabold text-lumora-primary tracking-tight">User Profile</h1>
      <p class="text-sm text-lumora-secondary mt-1">
        Manage your personal credentials, contact information, and biography.
      </p>
    </div>

    <div v-if="profileStore.isLoading && !profileStore.profile" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card padding="md" class="space-y-4 flex flex-col items-center">
        <Skeleton type="circle" class="w-24 h-24" />
        <Skeleton type="title" class="w-1/2" />
        <Skeleton type="text" class="w-1/3" />
      </Card>
      <Card padding="md" class="lg:col-span-2 space-y-4">
        <Skeleton type="title" class="w-1/4" />
        <Skeleton type="text" />
        <Skeleton type="text" />
        <Skeleton type="card" class="h-20" />
      </Card>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Profile Details Column -->
      <Card padding="md" class="flex flex-col items-center text-center h-fit">
        <div class="w-24 h-24 rounded-full bg-lumora-accent text-lumora-bg flex items-center justify-center text-4xl font-black select-none shadow-xl uppercase">
          {{ userAvatarLetter }}
        </div>
        <h3 class="text-lg font-bold text-lumora-primary mt-4">{{ profileStore.profile?.name }}</h3>
        <p class="text-xs text-lumora-secondary mt-0.5">{{ profileStore.profile?.email }}</p>
        <Badge variant="accent" class="mt-3">Student Portal</Badge>

        <div class="w-full border-t border-lumora-accent/10 pt-4 mt-6 text-left space-y-4">
          <h4 class="text-xs font-semibold text-lumora-primary uppercase tracking-wider">Achievements</h4>
          <div class="flex flex-wrap gap-2">
            <Badge variant="success">Frappe Basics</Badge>
            <Badge variant="info">Vue Architect</Badge>
            <Badge variant="default">Fast Learner</Badge>
          </div>
        </div>
      </Card>

      <!-- Right Form Column -->
      <Card padding="md" class="lg:col-span-2">
        <h3 class="text-lg font-bold text-lumora-primary mb-4 border-b border-lumora-accent/10 pb-2">Profile Details</h3>
        
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input v-model="profileName" label="Full Name" placeholder="Shaik Abrar" />
            <Input v-model="profileEmail" label="Email Address" type="email" placeholder="shaik@example.com" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input v-model="profileRole" label="Institution Role" disabled placeholder="Student" />
            <Input v-model="profilePhone" label="Phone Number" placeholder="+1 (555) 019-2831" />
          </div>

          <div class="flex flex-col gap-2 w-full">
            <label class="text-xs font-semibold text-lumora-primary tracking-wider uppercase">Biography</label>
            <textarea
              v-model="profileBio"
              rows="4"
              class="w-full bg-lumora-surface text-lumora-primary placeholder-lumora-secondary/70 border border-lumora-accent/25 rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-lumora-highlight resize-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div class="flex justify-end pt-2">
            <Button type="submit" variant="primary" :disabled="profileStore.isLoading">
              <span v-if="profileStore.isLoading">Saving...</span>
              <span v-else>Save Changes</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>

    <!-- Toast Confirmation -->
    <Toast :show="showToast" message="Profile changes saved successfully!" type="success" @close="showToast = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Card from '@/components/Card.vue';
import Badge from '@/components/Badge.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import Toast from '@/components/Toast.vue';
import Skeleton from '@/components/Skeleton.vue';

// Pinia Store Integration
import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Profile' }
];

const profileName = ref('');
const profileEmail = ref('');
const profileRole = ref('');
const profilePhone = ref('+1 (555) 019-2831');
const profileBio = ref('');
const showToast = ref(false);

const userAvatarLetter = computed(() => {
  if (profileStore.profile?.name) {
    return profileStore.profile.name[0];
  }
  return 'S';
});

// Synchronize store profile state with local form states
const syncForm = () => {
  if (profileStore.profile) {
    profileName.value = profileStore.profile.name;
    profileEmail.value = profileStore.profile.email;
    profileRole.value = profileStore.profile.role;
    profileBio.value = profileStore.profile.bio || '';
  }
};

onMounted(async () => {
  // Load profile values on page mount
  await profileStore.fetchProfile();
  syncForm();
});

// Watch store for updates (e.g. if loaded asynchronously)
watch(() => profileStore.profile, () => {
  syncForm();
}, { deep: true });

const saveProfile = async () => {
  try {
    await profileStore.updateProfile({
      name: profileName.value,
      email: profileEmail.value,
      bio: profileBio.value
    });
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  } catch (error) {
    console.error('Failed to update profile settings:', error);
  }
};
</script>
