import { defineStore } from 'pinia';
import { ref } from 'vue';
import { profileService, type UserProfile } from '@/services/profile.service';

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<UserProfile | null>({
    name: 'Shaik Abrar',
    email: 'shaik@example.com',
    role: 'Student',
    bio: 'Aspiring Full Stack Software Engineer interested in AI and decoupled architectures.',
    timezone: 'ist',
  });
  
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Fetches profile details from the service layer.
   */
  const fetchProfile = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      profile.value = await profileService.getProfile();
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user profile';
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Updates profile details.
   */
  const updateProfile = async (data: Partial<UserProfile>) => {
    isLoading.value = true;
    error.value = null;
    try {
      const updated = await profileService.updateProfile(data);
      profile.value = updated;
    } catch (err: any) {
      error.value = err.message || 'Failed to update user profile';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
  };
});
