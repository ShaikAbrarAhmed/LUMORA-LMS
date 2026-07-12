<template>
  <span
    class="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider select-none border"
    :class="[
      variant === 'default' && 'bg-lumora-surface border-lumora-accent/20 text-lumora-accent',
      variant === 'accent' && 'bg-lumora-accent/10 border-lumora-accent/30 text-lumora-accent',
      variant === 'success' && 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400',
      variant === 'warning' && 'bg-amber-500/5 border-amber-500/20 text-amber-400',
      variant === 'error' && 'bg-red-500/5 border-red-500/20 text-red-400',
      variant === 'info' && 'bg-blue-500/5 border-blue-500/20 text-blue-400'
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
});
</script>
