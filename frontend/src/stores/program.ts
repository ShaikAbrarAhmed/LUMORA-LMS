import { defineStore } from 'pinia';
import { ref } from 'vue';
import { programService, type Program } from '@/services/program.service';

export const useProgramStore = defineStore('program', () => {
  const programs = ref<Program[]>([]);
  const activeProgram = ref<Program | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Loads all programs enrolled by the student.
   */
  const loadPrograms = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      programs.value = await programService.getPrograms();
    } catch (err: any) {
      error.value = err.message || 'Failed to load programs';
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Loads program detailed module lessons.
   */
  const loadProgramDetails = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      activeProgram.value = await programService.getProgramDetails(id);
    } catch (err: any) {
      error.value = err.message || 'Failed to load program details';
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Triggers a query to search programs.
   */
  const searchPrograms = async (query: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      programs.value = await programService.searchPrograms(query);
    } catch (err: any) {
      error.value = err.message || 'Failed to search programs';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    programs,
    activeProgram,
    isLoading,
    error,
    loadPrograms,
    loadProgramDetails,
    searchPrograms,
  };
});
