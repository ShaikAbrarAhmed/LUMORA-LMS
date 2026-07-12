<template>
  <div class="flex items-center justify-between border-t border-lumora-accent/10 px-4 py-3 sm:px-6 mt-4">
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center rounded-xl border border-lumora-accent/20 bg-lumora-surface px-4 py-2 text-xs font-semibold text-lumora-primary hover:border-lumora-accent disabled:opacity-50 disabled:pointer-events-none transition-colors"
      >
        Previous
      </button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="relative ml-3 inline-flex items-center rounded-xl border border-lumora-accent/20 bg-lumora-surface px-4 py-2 text-xs font-semibold text-lumora-primary hover:border-lumora-accent disabled:opacity-50 disabled:pointer-events-none transition-colors"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-xs text-lumora-secondary">
          Showing page <span class="font-semibold text-lumora-primary">{{ currentPage }}</span> of <span class="font-semibold text-lumora-primary">{{ totalPages }}</span>
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md gap-1.5" aria-label="Pagination">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center rounded-lg p-2 text-lumora-secondary border border-lumora-accent/10 bg-lumora-surface hover:text-lumora-primary hover:border-lumora-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-4.5 w-4.5" />
          </button>
          
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="relative inline-flex items-center rounded-lg px-3.5 py-1.5 text-xs font-medium border transition-colors select-none"
            :class="[
              page === currentPage
                ? 'bg-lumora-accent border-lumora-accent text-lumora-bg font-semibold'
                : 'bg-lumora-surface border-lumora-accent/10 text-lumora-secondary hover:text-lumora-primary hover:border-lumora-accent'
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center rounded-lg p-2 text-lumora-secondary border border-lumora-accent/10 bg-lumora-surface hover:text-lumora-primary hover:border-lumora-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-4.5 w-4.5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@lucide/vue';

interface Props {
  currentPage: number;
  totalPages: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:page', page: number): void;
}>();

const visiblePages = computed(() => {
  const pages: number[] = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:page', page);
  }
};
</script>
