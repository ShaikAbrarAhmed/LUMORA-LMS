<template>
  <div class="space-y-6 text-left">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- Title Header -->
    <div>
      <h1 class="text-3xl font-extrabold text-lumora-primary tracking-tight">Learning Progress</h1>
      <p class="text-sm text-lumora-secondary mt-1">
        Track completed assignments, study milestones, and active grade breakdowns.
      </p>
    </div>

    <!-- Analytics Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card padding="sm" class="text-center">
        <h4 class="text-xs font-semibold text-lumora-secondary uppercase tracking-wider">Overall Grade</h4>
        <p class="text-3xl font-black text-lumora-primary mt-1">A-</p>
      </Card>
      <Card padding="sm" class="text-center">
        <h4 class="text-xs font-semibold text-lumora-secondary uppercase tracking-wider">Assignments Finished</h4>
        <p class="text-3xl font-black text-lumora-primary mt-1">18 / 20</p>
      </Card>
      <Card padding="sm" class="text-center">
        <h4 class="text-xs font-semibold text-lumora-secondary uppercase tracking-wider">Attendance Rate</h4>
        <p class="text-3xl font-black text-lumora-primary mt-1">98%</p>
      </Card>
      <Card padding="sm" class="text-center">
        <h4 class="text-xs font-semibold text-lumora-secondary uppercase tracking-wider">Certificates</h4>
        <p class="text-3xl font-black text-lumora-primary mt-1">1 Earned</p>
      </Card>
    </div>

    <!-- Tabs for detailed views -->
    <Tabs v-model="activeTab" :tabs="tabOptions">
      <div v-if="activeTab === 'courses'" class="space-y-4">
        <Table :columns="courseColumns" :data="coursesData">
          <template #progress="{ value }">
            <ProgressBar :progress="value" show-text />
          </template>
          <template #status="{ value }">
            <Badge :variant="value === 'Completed' ? 'success' : 'accent'">{{ value }}</Badge>
          </template>
        </Table>
      </div>

      <div v-if="activeTab === 'assignments'" class="space-y-4">
        <Table :columns="assignmentColumns" :data="assignmentsData">
          <template #score="{ value }">
            <span class="font-bold" :class="value >= 90 ? 'text-emerald-400' : 'text-lumora-primary'">{{ value }}%</span>
          </template>
          <template #status="{ value }">
            <Badge :variant="value === 'Graded' ? 'success' : 'warning'">{{ value }}</Badge>
          </template>
        </Table>
      </div>

      <div v-if="activeTab === 'certificates'" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card padding="md" class="flex flex-col justify-between h-40">
            <div>
              <div class="flex justify-between items-start">
                <Badge variant="success">Verified</Badge>
                <span class="text-[10px] text-lumora-secondary font-mono">ID: LUM-83920</span>
              </div>
              <h3 class="text-base font-bold text-lumora-primary mt-2">Introduction to Frappe Framework</h3>
              <p class="text-xs text-lumora-secondary">Completed on June 12, 2026</p>
            </div>
            <div class="flex justify-end">
              <Button variant="secondary" @click="downloadCert">Download PDF</Button>
            </div>
          </Card>
        </div>
      </div>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Card from '@/components/Card.vue';
import Tabs from '@/components/Tabs.vue';
import Table from '@/components/Table.vue';
import Badge from '@/components/Badge.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import Button from '@/components/Button.vue';

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Progress' }
];

const activeTab = ref('courses');

const tabOptions = [
  { id: 'courses', label: 'Course Progress' },
  { id: 'assignments', label: 'Recent Assignments' },
  { id: 'certificates', label: 'Certificates' }
];

const courseColumns = [
  { key: 'name', label: 'Course' },
  { key: 'progress', label: 'Completed progress' },
  { key: 'grade', label: 'Current Grade' },
  { key: 'status', label: 'Status' }
];

const coursesData = ref([
  { name: 'Advanced AI & Large Language Models', progress: 68, grade: 'A', status: 'In Progress' },
  { name: 'Decoupled Frontends with Vue 3', progress: 92, grade: 'A+', status: 'In Progress' },
  { name: 'Introduction to Frappe Framework', progress: 100, grade: 'A', status: 'Completed' }
]);

const assignmentColumns = [
  { key: 'title', label: 'Assignment Name' },
  { key: 'course', label: 'Course Context' },
  { key: 'score', label: 'Grade Score' },
  { key: 'status', label: 'Status' }
];

const assignmentsData = ref([
  { title: 'Fine-Tuning Llama-3-8B model', course: 'Advanced AI & Large Language Models', score: 95, status: 'Graded' },
  { title: 'Setup Custom Vite Aliases', course: 'Decoupled Frontends with Vue 3', score: 100, status: 'Graded' },
  { title: 'Designing custom Doctype schemas', course: 'Introduction to Frappe Framework', score: 88, status: 'Graded' },
  { title: 'Vue Router Guard Configurations', course: 'Decoupled Frontends with Vue 3', score: 0, status: 'Pending Review' }
]);

const downloadCert = () => {
  alert('Downloading certificate PDF file...');
};
</script>
