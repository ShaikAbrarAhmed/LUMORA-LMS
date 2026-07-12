<template>
  <nav class="sticky top-0 z-50 bg-lumora-surface/85 backdrop-blur-md border-b border-lumora-accent/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Brand Customizer Slot -->
        <div class="flex items-center">
          <slot name="left">
            <router-link to="/" class="flex items-center gap-2.5">
              <div class="w-8 h-8 bg-lumora-accent text-lumora-bg rounded-lg flex items-center justify-center font-black text-lg select-none">
                L
              </div>
              <span class="font-bold text-xl tracking-tight text-lumora-primary">LUMORA</span>
            </router-link>
          </slot>
        </div>

        <!-- Desktop Navigation Links (For Public Layout navbar) -->
        <div class="hidden md:flex items-center gap-6" v-if="links && links.length > 0">
          <router-link 
            v-for="link in links" 
            :key="link.path" 
            :to="link.path"
            class="text-sm font-medium transition-colors duration-200 select-none"
            :class="[
              $route.path === link.path 
                ? 'text-lumora-primary font-semibold' 
                : 'text-lumora-secondary hover:text-lumora-primary'
            ]"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- Desktop Action Buttons (Right Aligned) -->
        <div class="hidden md:flex items-center gap-4">
          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 transition-colors duration-200"
            title="Toggle theme"
          >
            <Sun v-if="isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <!-- Auth Actions (Public Layout) -->
          <template v-if="showAuth">
            <router-link to="/login" class="text-sm font-medium text-lumora-secondary hover:text-lumora-primary transition-colors duration-200 select-none">
              Log In
            </router-link>
            <router-link to="/signup" class="text-sm font-semibold px-4 py-2 bg-lumora-accent hover:bg-lumora-highlight text-lumora-bg rounded-xl transition-all duration-200">
              Sign Up
            </router-link>
          </template>

          <!-- User Dashboard Actions (Student Layout) -->
          <template v-if="showUserActions">
            <!-- Notification Icon -->
            <router-link to="/notifications" class="p-2 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 relative transition-colors">
              <span v-if="notificationStore.unreadCount > 0" class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-lumora-accent rounded-full animate-pulse"></span>
              <Bell class="w-5 h-5" />
            </router-link>

            <!-- Divider -->
            <div class="h-5 w-px bg-lumora-accent/10"></div>

            <!-- Profile Menu Dropdown -->
            <div class="relative" ref="dropdownRef">
              <button 
                @click="isDropdownOpen = !isDropdownOpen" 
                class="flex items-center gap-3 group focus:outline-none"
              >
                <div class="w-8 h-8 rounded-lg bg-lumora-accent text-lumora-bg flex items-center justify-center font-bold text-sm select-none group-hover:scale-105 transition-transform duration-200">
                  {{ userInitials }}
                </div>
                <div class="text-left select-none hidden lg:block">
                  <p class="text-xs font-semibold text-lumora-primary group-hover:text-lumora-secondary transition-colors">{{ userName }}</p>
                  <p class="text-[10px] text-lumora-secondary">{{ userRole }}</p>
                </div>
                <ChevronDown class="w-4 h-4 text-lumora-secondary hidden lg:block transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" />
              </button>

              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div 
                  v-if="isDropdownOpen" 
                  class="absolute right-0 mt-2 w-52 origin-top-right rounded-xl bg-lumora-surface border border-lumora-accent/20 shadow-xl overflow-hidden py-1.5 z-50 text-left"
                >
                  <div class="px-4 py-2 border-b border-lumora-accent/10">
                    <p class="text-xs font-bold text-lumora-primary truncate">{{ userName }}</p>
                    <p class="text-[10px] text-lumora-secondary truncate">{{ userRole }}</p>
                  </div>
                  <router-link 
                    to="/profile" 
                    class="flex items-center gap-2 px-4 py-2 text-sm text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 transition-colors"
                    @click="isDropdownOpen = false"
                  >
                    <User class="w-4 h-4" />
                    <span>My Profile</span>
                  </router-link>
                  <router-link 
                    to="/settings" 
                    class="flex items-center gap-2 px-4 py-2 text-sm text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 transition-colors"
                    @click="isDropdownOpen = false"
                  >
                    <Settings class="w-4 h-4" />
                    <span>Settings</span>
                  </router-link>
                  <div class="h-px bg-lumora-accent/10 my-1"></div>
                  <button 
                    @click="handleLogout" 
                    class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors text-left"
                  >
                    <LogOut class="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </transition>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Toggle Button (Visible on mobile/tablet) -->
        <div class="flex items-center gap-2 md:hidden">
          <!-- Theme Toggle (Mobile) -->
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 transition-colors duration-200"
            title="Toggle theme"
          >
            <Sun v-if="isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <!-- Burger Menu Button -->
          <button 
            v-if="(links && links.length > 0) || showAuth || showUserActions"
            @click="isMenuOpen = !isMenuOpen" 
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-md text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 focus:outline-none"
          >
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <div v-show="isMenuOpen" class="md:hidden border-t border-lumora-accent/10 bg-lumora-surface">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- Main Links (Public navbar) -->
        <router-link 
          v-for="link in links" 
          :key="link.path" 
          :to="link.path"
          class="block px-3 py-2 rounded-lg text-base font-medium text-lumora-secondary hover:text-lumora-primary hover:bg-white/5"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </router-link>

        <!-- Auth Actions (Mobile) -->
        <div v-if="showAuth" class="pt-4 pb-2 border-t border-lumora-accent/10 px-3 space-y-2">
          <router-link 
            to="/login" 
            class="block text-center px-4 py-2 border border-lumora-accent/20 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 text-sm font-medium"
            @click="isMenuOpen = false"
          >
            Log In
          </router-link>
          <router-link 
            to="/signup" 
            class="block text-center px-4 py-2 bg-lumora-accent hover:bg-lumora-highlight text-lumora-bg rounded-lg text-sm font-medium"
            @click="isMenuOpen = false"
          >
            Sign Up
          </router-link>
        </div>

        <!-- User Actions (Mobile) -->
        <div v-if="showUserActions" class="pt-4 pb-2 border-t border-lumora-accent/10 px-3 space-y-3">
          <div class="flex items-center justify-between">
            <router-link 
              to="/profile" 
              class="flex items-center gap-3"
              @click="isMenuOpen = false"
            >
              <div class="w-9 h-9 rounded-lg bg-lumora-accent text-lumora-bg flex items-center justify-center font-bold text-sm">
                {{ userInitials }}
              </div>
              <div class="text-left">
                <p class="text-xs font-semibold text-lumora-primary">{{ userName }}</p>
                <p class="text-[10px] text-lumora-secondary">{{ userRole }}</p>
              </div>
            </router-link>

            <router-link 
              to="/notifications" 
              class="p-2 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 relative"
              @click="isMenuOpen = false"
            >
              <span v-if="notificationStore.unreadCount > 0" class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-lumora-accent rounded-full"></span>
              <Bell class="w-6 h-6" />
            </router-link>
          </div>
          
          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-lumora-accent/5">
            <router-link 
              to="/profile" 
              class="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-lumora-accent/10 text-xs text-lumora-secondary hover:text-lumora-primary"
              @click="isMenuOpen = false"
            >
              <User class="w-4 h-4" />
              <span>Profile</span>
            </router-link>
            <router-link 
              to="/settings" 
              class="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-lumora-accent/10 text-xs text-lumora-secondary hover:text-lumora-primary"
              @click="isMenuOpen = false"
            >
              <Settings class="w-4 h-4" />
              <span>Settings</span>
            </router-link>
          </div>

          <button 
            @click="handleLogoutMobile" 
            class="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg bg-red-500/10 text-xs text-red-400 hover:text-red-300"
          >
            <LogOut class="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import {
  Sun,
  Moon,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut
} from '@lucide/vue';

interface NavLink {
  name: string;
  path: string;
}

const props = withDefaults(defineProps<{
  links?: NavLink[];
  showAuth?: boolean;
  showUserActions?: boolean;
  userName?: string;
  userRole?: string;
}>(), {
  links: () => [],
  showAuth: false,
  showUserActions: false,
  userName: 'Shaik Abrar',
  userRole: 'Student',
});

const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const isDark = ref(true);

const userInitials = computed(() => {
  if (!props.userName) return 'U';
  return props.userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (!isDark.value) {
    document.documentElement.classList.add('light');
    document.body.style.backgroundColor = '#F5F5F5';
    document.body.style.color = '#0A0A0A';
  } else {
    document.documentElement.classList.remove('light');
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
  }
};

const handleLogout = () => {
  isDropdownOpen.value = false;
  authStore.logout();
  router.push('/login');
};

const handleLogoutMobile = () => {
  isMenuOpen.value = false;
  authStore.logout();
  router.push('/login');
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(async () => {
  document.addEventListener('click', handleClickOutside);
  if (props.showUserActions) {
    await notificationStore.loadNotifications();
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
