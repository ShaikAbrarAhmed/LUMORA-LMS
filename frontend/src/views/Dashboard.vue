<template>
  <div class="space-y-8 text-left">
    <!-- Hero Card -->
    <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-lumora-surface/70 backdrop-blur-xl p-8 md:p-10">
      <!-- Subtle ambient glows -->
      <div class="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/[0.03] blur-[120px] pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-lumora-accent/[0.03] blur-[120px] pointer-events-none"></div>

      <div class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <!-- Greeting + copy + info pills -->
        <div class="max-w-xl">
          <h1 class="font-outfit text-3xl md:text-4xl font-extrabold tracking-tight text-lumora-primary">
            Welcome back, {{ authStore.user?.name || 'Student' }}
          </h1>
          <p class="text-sm text-lumora-secondary mt-3 leading-relaxed max-w-md">
            Continue your learning journey with personalized courses, progress tracking, and upcoming learning activities.
          </p>

          <!-- Hero info pills (visual only) -->
          <div class="flex flex-wrap items-center gap-2.5 mt-6">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-lumora-primary select-none">
              <LayoutDashboardIcon class="w-3.5 h-3.5 text-lumora-accent" />
              Personalized Dashboard
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-lumora-primary select-none">
              <ActivityIcon class="w-3.5 h-3.5 text-lumora-accent" />
              Real-time Progress
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-lumora-primary select-none">
              <SparklesIcon class="w-3.5 h-3.5 text-lumora-accent" />
              AI Learning Insights
            </span>
          </div>
        </div>

        <!-- Hero actions -->
        <div class="flex flex-col sm:flex-row lg:shrink-0 sm:items-center gap-3">
          <Button variant="secondary" class="w-full sm:w-auto !py-3 !px-6 group active:scale-[0.98]" @click="refreshData">
            <RefreshCwIcon
              class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
              :class="{ 'animate-spin': dashboardStore.isLoading || programStore.isLoading }"
            />
            <span>Refresh Data</span>
          </Button>
          <Button variant="primary" class="w-full sm:w-auto !py-3 !px-6 shadow-lg shadow-white/5 group active:scale-[0.98]" @click="showModal = true">
            <PlusIcon class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span>Schedule Session</span>
          </Button>
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card v-if="dashboardStore.isLoading" padding="md" v-for="n in 3" :key="'stat-sk-' + n">
        <div class="flex items-center gap-4">
          <Skeleton type="circle" />
          <div class="flex-grow space-y-2">
            <Skeleton type="title" class="w-1/2" />
            <Skeleton type="text" class="w-1/3" />
          </div>
        </div>
      </Card>
      <template v-else>
        <Card padding="md" class="flex items-center gap-4">
          <div class="p-3 bg-lumora-accent/10 border border-lumora-accent/20 rounded-xl text-lumora-primary">
            <GraduationCapIcon class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-semibold text-lumora-secondary uppercase tracking-wider">Enrolled Programs</p>
            <h3 class="text-2xl font-bold text-lumora-primary mt-0.5">
              {{ dashboardStore.summary?.enrolledProgramsCount || 0 }} Active
            </h3>
          </div>
        </Card>
        <Card padding="md" class="flex items-center gap-4">
          <div class="p-3 bg-lumora-accent/10 border border-lumora-accent/20 rounded-xl text-lumora-primary">
            <ClockIcon class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-semibold text-lumora-secondary uppercase tracking-wider">Learning Hours</p>
            <h3 class="text-2xl font-bold text-lumora-primary mt-0.5">
              {{ dashboardStore.summary?.studyTimeHours || 0 }} hrs
            </h3>
          </div>
        </Card>
        <Card padding="md" class="flex items-center gap-4">
          <div class="p-3 bg-lumora-accent/10 border border-lumora-accent/20 rounded-xl text-lumora-primary">
            <TrophyIcon class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-semibold text-lumora-secondary uppercase tracking-wider">Completed Courses</p>
            <h3 class="text-2xl font-bold text-lumora-primary mt-0.5">
              {{ dashboardStore.summary?.certificatesEarned || 0 }} Earned
            </h3>
          </div>
        </Card>
      </template>
    </div>

    <!-- Active Courses Grid -->
    <div>
      <h2 class="text-xl font-bold text-lumora-primary mb-4">My Enrolled Courses</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <template v-if="programStore.isLoading">
          <Card v-for="n in 3" :key="'course-sk-' + n" padding="md" class="space-y-4">
            <Skeleton type="title" class="w-2/3" />
            <Skeleton type="text" />
            <Skeleton type="text" class="w-1/2" />
            <Skeleton type="card" class="h-2.5 w-full mt-4" />
          </Card>
        </template>
        <template v-else-if="programStore.programs.length === 0">
          <Card padding="lg" class="col-span-full text-center">
            <p class="text-lumora-secondary text-sm">No programs enrolled yet.</p>
          </Card>
        </template>
        <template v-else>
          <Card
            v-for="course in programStore.programs"
            :key="course.id"
            padding="md"
            class="flex flex-col justify-between h-full"
            hoverable
          >
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="text-[10px] font-semibold text-lumora-secondary uppercase tracking-widest">{{ course.category }}</span>
                <Badge :variant="course.progressPercentage === 100 ? 'success' : 'accent'">
                  {{ course.progressPercentage === 100 ? 'Completed' : 'In Progress' }}
                </Badge>
              </div>
              <h3 class="text-base font-bold text-lumora-primary mb-2 line-clamp-2">{{ course.title }}</h3>
              <p class="text-xs text-lumora-secondary mb-6">Instructor: {{ course.instructorName }}</p>
            </div>
            <div class="space-y-2 mt-auto">
              <ProgressBar :progress="course.progressPercentage" show-text />
            </div>
          </Card>
        </template>
      </div>
    </div>

    <!-- Interactive Components Demo / Tooltips/ Toasts / Modals -->
    <Modal :show="showModal" title="Schedule Mentorship Session" @close="showModal = false">
      <p class="text-xs text-lumora-secondary mb-4">
        Book a 1-on-1 mentorship session with your instructor to clarify program assignments or research topics.
      </p>
      
      <div class="space-y-4">
        <Input v-model="sessionTopic" label="Session Topic" placeholder="e.g. LLM Fine-Tuning Queries" />
        <div>
          <label class="text-xs font-semibold text-lumora-primary tracking-wider uppercase mb-2 block">Select Instructor</label>
          <Dropdown v-model="selectedInstructor" :options="instructorOptions" placeholder="Choose a mentor" />
        </div>
      </div>

      <template #actions>
        <Button variant="ghost" @click="showModal = false">Cancel</Button>
        <Button variant="primary" @click="confirmSession">Confirm Schedule</Button>
      </template>
    </Modal>

    <!-- Toast Notification -->
    <Toast :show="showToast" :message="toastMessage" type="success" @close="showToast = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  GraduationCap as GraduationCapIcon, 
  Clock as ClockIcon, 
  Trophy as TrophyIcon,
  RefreshCw as RefreshCwIcon,
  Plus as PlusIcon,
  LayoutDashboard as LayoutDashboardIcon,
  Activity as ActivityIcon,
  Sparkles as SparklesIcon
} from '@lucide/vue';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import Badge from '@/components/Badge.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import Skeleton from '@/components/Skeleton.vue';
import Modal from '@/components/Modal.vue';
import Input from '@/components/Input.vue';
import Dropdown from '@/components/Dropdown.vue';
import Toast from '@/components/Toast.vue';

// Pinia Stores integration
import { useAuthStore } from '@/stores/auth';
import { useDashboardStore } from '@/stores/dashboard';
import { useProgramStore } from '@/stores/program';

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const programStore = useProgramStore();

const showModal = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const sessionTopic = ref('');
const selectedInstructor = ref('');

const instructorOptions = [
  { value: 'evelyn', label: 'Dr. Evelyn Carter' },
  { value: 'alex', label: 'Alex Rivera' },
  { value: 'priya', label: 'Priya Sharma' },
];

const refreshData = async () => {
  await Promise.all([
    dashboardStore.loadDashboardData(),
    programStore.loadPrograms()
  ]);
};

onMounted(async () => {
  // Load statistical summaries and program enrollment catalogs on page mount
  await refreshData();
});

const confirmSession = () => {
  if (!sessionTopic.value) {
    alert('Please enter a session topic');
    return;
  }
  showModal.value = false;
  toastMessage.value = `Session on "${sessionTopic.value}" scheduled successfully!`;
  showToast.value = true;
  sessionTopic.value = '';
  // Auto-close toast
  setTimeout(() => {
    showToast.value = false;
  }, 4000);
};
</script>
