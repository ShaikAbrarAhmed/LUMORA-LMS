<template>
  <Card padding="lg" class="text-center relative max-w-xl mx-auto shadow-2xl">
    <header class="flex justify-center mb-6">
      <Badge variant="accent">
        {{ systemVersion }}
      </Badge>
    </header>
    
    <div class="flex flex-col items-center gap-4 mb-6">
      <div class="w-16 h-16 bg-lumora-accent text-lumora-bg rounded-2xl flex items-center justify-center text-3xl font-black shadow-xl shadow-white/5 hover:rotate-6 hover:scale-105 transition-transform duration-300 select-none">
        L
      </div>
      <h1 class="text-4xl font-extrabold tracking-tight text-lumora-primary">
        {{ appName }}
      </h1>
    </div>
    
    <p class="text-lumora-secondary text-sm leading-relaxed mb-6 font-light">
      A next-generation, decoupled Learning Management System built with Vue 3, Vite, and Frappe framework.
    </p>

    <div class="inline-flex items-center gap-2.5 bg-lumora-accent/5 border border-lumora-accent/25 px-4 py-2 rounded-xl mb-8">
      <div class="w-1.5 h-1.5 bg-lumora-accent rounded-full animate-pulse"></div>
      <span class="text-xs font-semibold text-lumora-primary">{{ buildStatus }}</span>
    </div>

    <!-- Navigation Quicklinks -->
    <div class="grid grid-cols-2 gap-4 mb-8">
      <router-link to="/login" class="inline-flex items-center justify-center">
        <Button variant="secondary" class="w-full">Student Portal</Button>
      </router-link>
      <router-link to="/dashboard" class="inline-flex items-center justify-center">
        <Button variant="primary" class="w-full">Go to App</Button>
      </router-link>
    </div>

    <div class="grid grid-cols-3 gap-3 border-t border-lumora-accent/10 pt-6 text-center">
      <Card padding="sm" class="bg-black/10 border-lumora-accent/5">
        <h4 class="text-xs font-semibold text-lumora-secondary mb-1">Client</h4>
        <span class="text-[10px] text-lumora-accent font-semibold">Vue 3 / TS</span>
      </Card>
      <Card padding="sm" class="bg-black/10 border-lumora-accent/5">
        <h4 class="text-xs font-semibold text-lumora-secondary mb-1">Core Engine</h4>
        <span class="text-[10px] text-lumora-accent font-semibold">Frappe / Py</span>
      </Card>
      <Card padding="sm" class="bg-black/10 border-lumora-accent/5">
        <h4 class="text-xs font-semibold text-lumora-secondary mb-1">Docker</h4>
        <span class="text-[10px] text-lumora-accent font-semibold">Orchestrated</span>
      </Card>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import Badge from '@/components/Badge.vue';

const appName = ref('LUMORA LMS');
const systemVersion = ref('v1.0.0-alpha');
const buildStatus = ref('System Architecture Initialized');
</script>
