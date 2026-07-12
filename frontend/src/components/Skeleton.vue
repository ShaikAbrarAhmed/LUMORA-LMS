<template>
  <div
    class="animate-pulse bg-lumora-accent/10 border border-lumora-accent/5 rounded-xl"
    :class="[
      type === 'text' && 'h-4 w-full',
      type === 'title' && 'h-6 w-3/4',
      type === 'circle' && 'h-12 w-12 rounded-full',
      type === 'card' && 'h-48 w-full',
      type === 'button' && 'h-10 w-28'
    ]"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'text' | 'title' | 'circle' | 'card' | 'button';
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});
</script>
