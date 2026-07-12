<template>
  <div class="relative inline-block group">
    <slot />
    <div
      class="absolute z-50 px-2.5 py-1.5 text-xs text-lumora-primary bg-lumora-surface border border-lumora-accent/20 rounded-lg shadow-xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      :class="[
        position === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        position === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2',
        position === 'left' && 'right-full top-1/2 -translate-y-1/2 mr-2',
        position === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2'
      ]"
    >
      {{ text }}
      <!-- Arrow -->
      <div
        class="absolute w-1.5 h-1.5 bg-lumora-surface border-t border-l border-lumora-accent/20 rotate-45"
        :class="[
          position === 'top' && 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0 border-r border-b',
          position === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2',
          position === 'left' && 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-l-0 border-b-0 border-r border-t',
          position === 'right' && 'right-full top-1/2 translate-x-1/2 -translate-y-1/2 border-r-0 border-t-0 border-l border-b'
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

withDefaults(defineProps<Props>(), {
  position: 'top',
});
</script>
