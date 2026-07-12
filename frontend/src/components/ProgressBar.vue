<template>
  <div class="w-full text-left">
    <div v-if="label || showText" class="flex justify-between items-center mb-1.5">
      <span v-if="label" class="text-xs font-semibold text-lumora-primary">{{ label }}</span>
      <span v-if="showText" class="text-xs font-semibold text-lumora-accent">{{ Math.round(progress) }}%</span>
    </div>
    <div
      class="w-full bg-[#1e1e1e] border border-lumora-accent/5 rounded-full overflow-hidden"
      :class="[
        size === 'sm' && 'h-1.5',
        size === 'md' && 'h-2.5'
      ]"
    >
      <div
        class="bg-lumora-accent h-full rounded-full transition-all duration-500 ease-out"
        :style="{ width: `${Math.min(100, Math.max(0, progress))}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number;
  label?: string;
  showText?: boolean;
  size?: 'sm' | 'md';
}

withDefaults(defineProps<Props>(), {
  progress: 0,
  label: '',
  showText: false,
  size: 'sm',
});
</script>
