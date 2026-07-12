<template>
  <div class="space-y-6 text-left">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- Title Header -->
    <div>
      <h1 class="text-3xl font-extrabold text-lumora-primary tracking-tight">Academic Programs</h1>
      <p class="text-sm text-lumora-secondary mt-1">
        Explore professional degrees, certifications, and specialized learning modules.
      </p>
    </div>

    <!-- Filters Row -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-lumora-surface p-4 rounded-[16px] border border-lumora-accent/10">
      <div class="w-full sm:max-w-xs">
        <Input 
          v-model="searchQuery" 
          placeholder="Search programs..." 
          @input="handleSearch"
        />
      </div>
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <span class="text-xs font-semibold text-lumora-secondary whitespace-nowrap">Filter Level:</span>
        <Dropdown v-model="selectedLevel" :options="levelOptions" placeholder="All Levels" />
      </div>
    </div>

    <!-- Programs Table -->
    <div v-if="programStore.isLoading" class="space-y-4">
      <Card padding="md" v-for="n in 3" :key="'loader-sk-' + n" class="space-y-3">
        <Skeleton type="title" class="w-1/3" />
        <Skeleton type="text" class="w-full" />
      </Card>
    </div>
    <Table v-else :columns="columns" :data="paginatedPrograms">
      <!-- Custom slots for table columns -->
      <template #name="{ row }">
        <div class="font-semibold text-lumora-primary">{{ row.name }}</div>
        <div class="text-xs text-lumora-secondary/70">{{ row.code }}</div>
      </template>

      <template #level="{ value }">
        <Badge :variant="value === 'Advanced' ? 'accent' : value === 'Intermediate' ? 'info' : 'success'">{{ value }}</Badge>
      </template>

      <template #duration="{ value }">
        <span class="font-medium text-lumora-primary">{{ value }}</span>
      </template>

      <template #courses="{ value }">
        <span class="font-semibold text-lumora-primary">{{ value }} courses</span>
      </template>

      <template #actions="{ row }">
        <Button variant="secondary" @click="viewProgram(row)">
          View details
        </Button>
      </template>
    </Table>

    <!-- Pagination -->
    <Pagination
      v-if="!programStore.isLoading"
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="currentPage = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Input from '@/components/Input.vue';
import Dropdown from '@/components/Dropdown.vue';
import Table from '@/components/Table.vue';
import Badge from '@/components/Badge.vue';
import Button from '@/components/Button.vue';
import Pagination from '@/components/Pagination.vue';
import Skeleton from '@/components/Skeleton.vue';
import Card from '@/components/Card.vue';

// Pinia Store Integration
import { useProgramStore } from '@/stores/program';

const programStore = useProgramStore();

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Programs' }
];

const searchQuery = ref('');
const selectedLevel = ref('all');
const currentPage = ref(1);
const itemsPerPage = 3;

const levelOptions = [
  { value: 'all', label: 'All Levels' },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

const columns = [
  { key: 'name', label: 'Program Name' },
  { key: 'level', label: 'Difficulty Level' },
  { key: 'duration', label: 'Duration' },
  { key: 'courses', label: 'Structure' },
  { key: 'actions', label: '' }
];

onMounted(async () => {
  // Load programs from Pinia store on mount
  await programStore.loadPrograms();
});

const handleSearch = async () => {
  currentPage.value = 1;
  await programStore.searchPrograms(searchQuery.value);
};

// Map store program objects to UI Table rows format
const mappedPrograms = computed(() => {
  return programStore.programs.map(prog => ({
    id: prog.id,
    name: prog.title,
    code: prog.id.toUpperCase(),
    level: prog.progressPercentage === 0 ? 'Beginner' : prog.progressPercentage < 50 ? 'Intermediate' : 'Advanced',
    duration: prog.progressPercentage > 50 ? '6 Months' : '3 Months',
    courses: prog.progressPercentage > 80 ? 8 : 4
  }));
});

// Filtered programs based on level selection
const filteredPrograms = computed(() => {
  return mappedPrograms.value.filter(prog => {
    const matchesLevel = selectedLevel.value === 'all' || prog.level === selectedLevel.value;
    return matchesLevel;
  });
});

// Total pages calculation
const totalPages = computed(() => {
  return Math.ceil(filteredPrograms.value.length / itemsPerPage) || 1;
});

// Paginated data slice
const paginatedPrograms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPrograms.value.slice(start, start + itemsPerPage);
});

const viewProgram = (program: any) => {
  alert(`Navigating to program details for: ${program.name}`);
};
</script>
