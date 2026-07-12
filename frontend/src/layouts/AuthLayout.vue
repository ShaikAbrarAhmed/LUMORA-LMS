<template>
  <div class="min-h-screen flex flex-col bg-lumora-bg text-lumora-primary font-sans relative overflow-hidden">
    <!-- Ambient Glow Spheres (Premium Decorative Background) -->
    <div class="absolute w-[600px] h-[600px] rounded-full bg-white/[0.01] blur-[150px] top-[-10%] left-[-20%] pointer-events-none animate-pulse duration-[10000ms]"></div>
    <div class="absolute w-[500px] h-[500px] rounded-full bg-lumora-accent/[0.01] blur-[130px] bottom-[-10%] right-[-15%] pointer-events-none animate-pulse duration-[8000ms]"></div>

    <!-- Header (Minimal Logo) -->
    <header class="w-full py-6 px-8 z-10 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-lumora-accent text-lumora-bg rounded-lg flex items-center justify-center font-black text-lg select-none">
          L
        </div>
        <span class="font-bold text-xl tracking-tight text-lumora-primary">LUMORA</span>
      </router-link>
      
      <router-link 
        to="/" 
        class="text-xs text-lumora-secondary hover:text-lumora-primary transition-colors flex items-center gap-1 group"
      >
        <span>Back to Home</span>
        <span class="group-hover:translate-x-0.5 transition-transform duration-200">&rarr;</span>
      </router-link>
    </header>

    <!-- Main Content Centered Card -->
    <main class="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </main>

    <!-- Minimal Footer -->
    <footer class="w-full py-4 text-center text-[10px] text-lumora-secondary/40 z-10">
      &copy; 2026 Lumora LMS. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
// Minimal setup for Auth Layout
</script>
