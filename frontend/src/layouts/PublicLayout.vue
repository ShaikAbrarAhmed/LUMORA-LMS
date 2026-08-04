<template>
  <div class="h-screen flex flex-col bg-lumora-bg text-lumora-primary font-sans overflow-hidden">
    <!-- Navbar -->
    <Navbar :links="navLinks" show-auth />

    <!-- Main Content Area (scrollable) -->
    <main class="flex-grow relative overflow-y-auto px-4 sm:px-6 lg:px-8">
      <!-- Ambient Glow Spheres (Decorative background) -->
      <div class="absolute w-[500px] h-[500px] rounded-full bg-white/[0.01] blur-[120px] top-1/4 -left-64 pointer-events-none"></div>
      <div class="absolute w-[500px] h-[500px] rounded-full bg-lumora-accent/[0.01] blur-[120px] bottom-1/4 -right-64 pointer-events-none"></div>

      <!-- Content Injection -->
      <div class="w-full max-w-7xl mx-auto z-10">
        <slot />
      </div>
    </main>

    <!-- Footer (hidden on landing; landing ships its own premium footer) -->
    <Footer v-if="route.path !== '/'" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';

const route = useRoute();

const navLinks = [
  { name: 'Home', path: '/' }
];
</script>
