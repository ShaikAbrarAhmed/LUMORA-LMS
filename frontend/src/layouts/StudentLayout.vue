<template>
  <div class="min-h-screen flex bg-lumora-bg text-lumora-primary font-sans overflow-hidden">
    <!-- Sidebar Component -->
    <Sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Main Content Container -->
    <div class="flex-grow flex flex-col h-screen overflow-hidden">
      <!-- Navbar -->
      <Navbar show-user-actions>
        <template #left>
          <!-- Toggle Sidebar Button (Mobile Only) -->
          <button 
            @click="isSidebarOpen = !isSidebarOpen"
            class="p-2 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 focus:outline-none md:hidden"
            aria-label="Toggle Sidebar"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          
          <!-- Page title from route name -->
          <h1 class="text-lg font-semibold text-lumora-primary capitalize hidden sm:block">
            {{ activePageName }}
          </h1>
        </template>
      </Navbar>

      <!-- Page Content -->
      <main class="flex-grow p-6 overflow-y-auto relative bg-lumora-bg">
        <!-- Top right glow sphere for depth -->
        <div class="absolute w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-[120px] top-0 right-0 pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto z-10 relative">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

const isSidebarOpen = ref(false);
const route = useRoute();

// Simple navigation paths used to resolve page titles
const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Programs', path: '/programs' },
  { name: 'Progress', path: '/progress' },
  { name: 'Notifications', path: '/notifications' },
  { name: 'Profile', path: '/profile' },
  { name: 'Settings', path: '/settings' },
];

const activePageName = computed(() => {
  const currentRoute = navItems.find(item => item.path === route.path);
  return currentRoute ? currentRoute.name : (route.name as string || 'Lumora');
});
</script>
