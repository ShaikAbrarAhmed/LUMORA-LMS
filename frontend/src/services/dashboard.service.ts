import { api } from './api/axios';
import { API_ENDPOINTS } from '@/constants/api';

export interface DashboardSummary {
  enrolledProgramsCount: number;
  completedLessonsCount: number;
  studyTimeHours: number;
  averageGradePercentage: number;
  certificatesEarned: number;
}

export interface ActivityItem {
  id: string;
  type: 'course' | 'quiz' | 'certificate' | 'discussion';
  title: string;
  description: string;
  timestamp: string;
}

export const dashboardService = {
  /**
   * Fetches summary statistics for the active student's dashboard.
   */
  async fetchSummary(): Promise<DashboardSummary> {
    try {
      return await api.get<DashboardSummary>(API_ENDPOINTS.DASHBOARD.SUMMARY);
    } catch (error) {
      console.warn('[Dashboard Service] Fetching summary failed, returning mock statistics.');
      return {
        enrolledProgramsCount: 4,
        completedLessonsCount: 28,
        studyTimeHours: 42.5,
        averageGradePercentage: 88,
        certificatesEarned: 1,
      };
    }
  },

  /**
   * Fetches recent feed activity for the student.
   */
  async fetchRecentActivity(): Promise<ActivityItem[]> {
    try {
      return await api.get<ActivityItem[]>(API_ENDPOINTS.DASHBOARD.ACTIVITY);
    } catch (error) {
      console.warn('[Dashboard Service] Fetching activities failed, returning mock activities.');
      return [
        {
          id: 'act-1',
          type: 'course',
          title: 'Advanced AI Architectures',
          description: 'Completed Lesson 3: Transformer Networks and Self-Attention Mechanics.',
          timestamp: '2 hours ago',
        },
        {
          id: 'act-2',
          type: 'quiz',
          title: 'Database Systems & SQL',
          description: 'Scored 92% on Quiz 1: Normalization & Index Optimization.',
          timestamp: 'Yesterday',
        },
        {
          id: 'act-3',
          type: 'certificate',
          title: 'Full Stack Development Boot Camp',
          description: 'Earned Course Completion Certificate for Web Architecture.',
          timestamp: '3 days ago',
        },
        {
          id: 'act-4',
          type: 'discussion',
          title: 'UX Design Essentials',
          description: 'Replied to thread "Figma component scoping best practices".',
          timestamp: '5 days ago',
        },
      ];
    }
  }
};
