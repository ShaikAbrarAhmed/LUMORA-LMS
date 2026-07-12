<template>
  <footer class="w-full bg-transparent border-t border-lumora-accent/10 py-8 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <!-- Left side: Copyright & Brand -->
      <div class="flex items-center gap-2 select-none">
        <span class="text-xs font-semibold tracking-wider text-lumora-accent/80">LUMORA</span>
        <span class="text-xs text-lumora-secondary/50">|</span>
        <p class="text-xs text-lumora-secondary/70">
          &copy; 2026 Lumora LMS. All rights reserved.
        </p>
      </div>
      
      <!-- Center: Quick links -->
      <div class="flex items-center gap-6">
        <a href="#" class="text-xs text-lumora-secondary/70 hover:text-lumora-primary transition-colors duration-200">
          About
        </a>
        <a href="#" class="text-xs text-lumora-secondary/70 hover:text-lumora-primary transition-colors duration-200">
          Privacy Policy
        </a>
        <a href="#" class="text-xs text-lumora-secondary/70 hover:text-lumora-primary transition-colors duration-200">
          Terms of Service
        </a>
        <a href="#" class="text-xs text-lumora-secondary/70 hover:text-lumora-primary transition-colors duration-200">
          Contact Support
        </a>
      </div>

      <!-- Right side: Social links placeholders -->
      <div class="flex items-center gap-4">
        <a href="#" class="p-1.5 rounded-lg text-lumora-secondary/70 hover:text-lumora-primary hover:bg-white/5 transition-colors duration-200" title="Twitter / X">
          <Twitter class="w-4 h-4" />
        </a>
        <a href="#" class="p-1.5 rounded-lg text-lumora-secondary/70 hover:text-lumora-primary hover:bg-white/5 transition-colors duration-200" title="LinkedIn">
          <Linkedin class="w-4 h-4" />
        </a>
        <a href="#" class="p-1.5 rounded-lg text-lumora-secondary/70 hover:text-lumora-primary hover:bg-white/5 transition-colors duration-200" title="GitHub">
          <Github class="w-4 h-4" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Twitter, Linkedin, Github } from 'lucide-vue-next';
</script>
