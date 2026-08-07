<template>
  <div class="h-screen flex flex-col bg-lumora-bg text-lumora-primary font-sans relative overflow-hidden">
    <!-- Ambient Glow Spheres (Premium Decorative Background) -->
    <div class="absolute w-[600px] h-[600px] rounded-full bg-white/[0.01] blur-[150px] top-[-10%] left-[-20%] pointer-events-none animate-pulse duration-[10000ms]"></div>
    <div class="absolute w-[500px] h-[500px] rounded-full bg-lumora-accent/[0.01] blur-[130px] bottom-[-10%] right-[-15%] pointer-events-none animate-pulse duration-[8000ms]"></div>

    <!-- Header (Minimal Logo) -->
    <header class="w-full py-4 px-6 md:px-8 z-10 flex items-center justify-between">
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
    <main class="flex-grow overflow-y-auto z-10">
      <div class="min-h-full flex flex-col justify-center px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3">
        <div class="w-full max-w-md mx-auto">
          <slot />
        </div>
      </div>
    </main>

    <!-- Minimal Footer -->
    <footer class="w-full py-2.5 text-center text-[10px] text-lumora-secondary/40 z-10">
      &copy; 2026 Lumora LMS. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
// Minimal setup for Auth Layout
</script>
