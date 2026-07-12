<template>
  <div
    class="bg-lumora-surface border border-lumora-accent/10 rounded-[16px] transition-all duration-200 overflow-hidden"
    :class="[
      padding === 'none' && 'p-0',
      padding === 'sm' && 'p-4',
      padding === 'md' && 'p-6',
      padding === 'lg' && 'p-8',
      hoverable && 'hover:border-lumora-accent/20 hover:bg-[#181818]'
    ]"
  >
    <div v-if="$slots.header" class="border-b border-lumora-accent/10 pb-4 mb-4 flex items-center justify-between">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="border-t border-lumora-accent/10 pt-4 mt-4 flex items-center justify-between text-xs text-lumora-secondary">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  hoverable: false,
});
</script>
