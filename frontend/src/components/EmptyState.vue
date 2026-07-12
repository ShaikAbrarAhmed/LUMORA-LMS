<template>
  <div class="flex flex-col items-center justify-center text-center p-8 border border-dashed border-lumora-accent/15 rounded-[16px] bg-lumora-surface/50">
    <div class="w-12 h-12 rounded-xl bg-lumora-accent/10 border border-lumora-accent/20 flex items-center justify-center text-lumora-accent mb-4">
      <component :is="icon" class="w-6 h-6" />
    </div>
    <h3 class="text-base font-bold text-lumora-primary mb-1">{{ title }}</h3>
    <p class="text-sm text-lumora-secondary max-w-sm mb-6">{{ description }}</p>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  title: string;
  description: string;
  icon: Component;
}

defineProps<Props>();
</script>
