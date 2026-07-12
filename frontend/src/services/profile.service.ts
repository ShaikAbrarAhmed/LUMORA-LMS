import { api } from './api/axios';
import { API_ENDPOINTS } from '@/constants/api';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
  timezone?: string;
}

export const profileService = {
  /**
   * Fetches the current student's personal profile information.
   */
  async getProfile(): Promise<UserProfile> {
    try {
      return await api.get<UserProfile>(API_ENDPOINTS.PROFILE.GET);
    } catch (error) {
      console.warn('[Profile Service] Fetching profile failed, using local mock defaults.');
      return {
        name: 'Shaik Abrar',
        email: 'shaik@example.com',
        role: 'Student',
        bio: 'Aspiring Full Stack Software Engineer interested in AI and decoupled architectures.',
        timezone: 'ist',
      };
    }
  },

  /**
   * Updates the student's personal profile information.
   */
  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    try {
      return await api.post<UserProfile>(API_ENDPOINTS.PROFILE.UPDATE, profile);
    } catch (error) {
      console.warn('[Profile Service] Updating profile failed, updating local client state.');
      return {
        name: profile.name || 'Shaik Abrar',
        email: profile.email || 'shaik@example.com',
        role: 'Student',
        bio: profile.bio || 'Aspiring Full Stack Software Engineer interested in AI and decoupled architectures.',
        timezone: profile.timezone || 'ist',
      };
    }
  }
};
