<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-lumora-highlight/50 disabled:opacity-50 disabled:pointer-events-none text-sm px-4 py-2.5 rounded-xl gap-2 select-none"
    :class="[
      variant === 'primary' && 'bg-lumora-accent text-lumora-bg hover:bg-lumora-highlight font-semibold',
      variant === 'secondary' && 'bg-transparent border border-lumora-accent text-lumora-primary hover:bg-white/5',
      variant === 'ghost' && 'bg-transparent text-lumora-primary hover:bg-lumora-surface'
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>
