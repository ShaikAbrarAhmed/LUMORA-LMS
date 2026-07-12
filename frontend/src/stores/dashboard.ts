import { defineStore } from 'pinia';
import { ref } from 'vue';
import { dashboardService, type DashboardSummary, type ActivityItem } from '@/services/dashboard.service';

export const useDashboardStore = defineStore('dashboard', () => {
  const summary = ref<DashboardSummary | null>({
    enrolledProgramsCount: 3,
    completedLessonsCount: 28,
    studyTimeHours: 42.5,
    averageGradePercentage: 88,
    certificatesEarned: 1,
  });
  
  const activities = ref<ActivityItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Loads both stats summary and feed activities in parallel.
   */
  const loadDashboardData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const [summaryData, activitiesData] = await Promise.all([
        dashboardService.fetchSummary(),
        dashboardService.fetchRecentActivity(),
      ]);
      summary.value = summaryData;
      activities.value = activitiesData;
    } catch (err: any) {
      error.value = err.message || 'Failed to load dashboard data';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    summary,
    activities,
    isLoading,
    error,
    loadDashboardData,
  };
});
