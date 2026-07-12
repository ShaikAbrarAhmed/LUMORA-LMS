import { api } from './api/axios';
import { API_ENDPOINTS } from '@/constants/api';

export interface PerformanceStats {
  weeklyStudyMinutes: number[];
  completedAssignments: number;
  averageQuizScorePercentage: number;
  learningVelocity: 'accelerating' | 'steady' | 'needs-attention';
}

export interface ProgressMilestone {
  id: string;
  name: string;
  targetDate: string;
  achieved: boolean;
}

export const analyticsService = {
  /**
   * Retrieves overall student progress milestones.
   */
  async getProgress(): Promise<ProgressMilestone[]> {
    try {
      return await api.get<ProgressMilestone[]>(API_ENDPOINTS.ANALYTICS.PROGRESS);
    } catch (error) {
      console.warn('[Analytics Service] Fetching milestones failed, returning local mocks.');
      return [
        { id: 'm-1', name: 'Finish Module 1: AI Architectures', targetDate: '2026-07-10', achieved: true },
        { id: 'm-2', name: 'Complete SQL Optimization Quiz', targetDate: '2026-07-15', achieved: true },
        { id: 'm-3', name: 'Submit Midterm Frontend Capstone', targetDate: '2026-07-25', achieved: false },
        { id: 'm-4', name: 'Graduation Certification Audit', targetDate: '2026-08-15', achieved: false },
      ];
    }
  },

  /**
   * Retrieves detailed learning performance stats.
   */
  async getPerformanceStats(): Promise<PerformanceStats> {
    try {
      return await api.get<PerformanceStats>(API_ENDPOINTS.ANALYTICS.PERFORMANCE);
    } catch (error) {
      console.warn('[Analytics Service] Fetching stats failed, returning mock analytics.');
      return {
        weeklyStudyMinutes: [120, 180, 150, 240, 310, 280, 360], // Monday to Sunday minutes
        completedAssignments: 8,
        averageQuizScorePercentage: 91.5,
        learningVelocity: 'accelerating',
      };
    }
  }
};
