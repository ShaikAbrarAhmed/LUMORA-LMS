<template>
  <div>
    <!-- Mobile Backdrop Overlay -->
    <div 
      v-show="isOpen" 
      @click="$emit('close')"
      class="fixed inset-0 z-30 bg-[#0A0A0A]/85 md:hidden backdrop-blur-md"
    ></div>

    <!-- Sidebar Aside -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-40 bg-lumora-surface border-r border-lumora-accent/10 flex flex-col justify-between transition-all duration-300 ease-in-out md:static md:translate-x-0 h-screen overflow-hidden',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        isCollapsed ? 'w-20' : 'w-[272px]'
      ]"
    >
      <!-- Top Section: Logo & Navigation -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Sidebar Header / Logo -->
        <div class="h-16 flex items-center px-6 border-b border-lumora-accent/10 justify-between flex-shrink-0">
          <router-link to="/dashboard" class="flex items-center gap-3" @click="$emit('close')">
            <div class="w-8 h-8 bg-lumora-accent text-lumora-bg rounded-lg flex items-center justify-center font-black text-lg select-none flex-shrink-0">
              L
            </div>
            <span 
              v-show="!isCollapsed" 
              class="font-bold text-xl tracking-tight text-lumora-primary transition-opacity duration-300 select-none"
            >
              LUMORA
            </span>
          </router-link>
          
          <!-- Mobile close button inside sidebar -->
          <button 
            @click="$emit('close')"
            class="p-1.5 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 md:hidden focus:outline-none transition-colors duration-200"
            aria-label="Close Sidebar"
          >
            <XIcon class="w-5 h-5" />
          </button>

          <!-- Desktop Collapse/Expand Toggle Button (Hidden on Mobile) -->
          <button 
            v-show="!isOpen" 
            @click="toggleCollapse"
            class="hidden md:flex p-1.5 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 focus:outline-none transition-colors duration-200"
            :aria-label="isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
          >
            <ChevronLeft v-if="!isCollapsed" class="w-4 h-4" />
            <ChevronRight v-else class="w-4 h-4" />
          </button>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-grow py-6 px-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="group relative flex items-center gap-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none"
            :class="[
              $route.path === item.path 
                ? 'bg-lumora-highlight/10 text-lumora-primary font-semibold' 
                : 'text-lumora-secondary hover:text-lumora-primary hover:bg-[#1a1a1a]',
              isCollapsed ? 'justify-center px-0' : 'pl-9 pr-4'
            ]"
            :title="isCollapsed ? item.name : undefined"
            @click="$emit('close')"
          >
            <!-- Vertical Active Accent Bar -->
            <span 
              :class="[
                'absolute w-1 h-5 rounded-full bg-lumora-accent transition-all duration-200 origin-center',
                $route.path === item.path ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
                isCollapsed ? 'left-1' : 'left-3'
              ]"
            ></span>

            <!-- Icon -->
            <component 
              :is="item.icon" 
              class="w-4.5 h-4.5 transition-colors duration-200 flex-shrink-0"
              :class="[
                $route.path === item.path ? 'text-lumora-primary' : 'text-lumora-secondary group-hover:text-lumora-primary'
              ]"
            />
            
            <!-- Label (Hidden when collapsed) -->
            <span 
              v-show="!isCollapsed" 
              class="mt-0.5 whitespace-nowrap transition-opacity duration-300"
            >
              {{ item.name }}
            </span>
          </router-link>
        </nav>
      </div>

      <!-- Bottom Section: Logout Button -->
      <div 
        class="p-4 border-t border-lumora-accent/10 flex-shrink-0 bg-lumora-surface transition-all duration-300"
        :class="isCollapsed ? 'flex justify-center' : ''"
      >
        <router-link 
          to="/login" 
          class="flex items-center gap-3.5 w-full rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200 border border-transparent select-none"
          :class="isCollapsed ? 'justify-center p-2.5' : 'px-4 py-3'"
          title="Log Out"
          @click="handleLogout"
        >
          <LogOutIcon class="w-4.5 h-4.5 flex-shrink-0" />
          <span v-show="!isCollapsed" class="whitespace-nowrap">Log Out</span>
        </router-link>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {
  LayoutDashboard,
  GraduationCap,
  LineChart,
  Bell,
  User,
  Settings,
  LogOut as LogOutIcon,
  X as XIcon,
  ChevronLeft,
  ChevronRight
} from '@lucide/vue';

defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
}>();

const authStore = useAuthStore();

// Track collapsed state with local storage persistence
const isCollapsed = ref(false);

onMounted(() => {
  const savedState = localStorage.getItem('lumora-sidebar-collapsed');
  if (savedState !== null) {
    isCollapsed.value = savedState === 'true';
  }
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem('lumora-sidebar-collapsed', String(isCollapsed.value));
};

const handleLogout = () => {
  authStore.logout();
};

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Programs', path: '/programs', icon: GraduationCap },
  { name: 'Progress', path: '/progress', icon: LineChart },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];
</script>
