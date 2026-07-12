<template>
  <div class="w-full text-left">
    <div class="flex border-b border-lumora-accent/10 mb-6 overflow-x-auto scrollbar-none">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="$emit('update:modelValue', tab.id)"
        class="relative px-4 py-3 text-sm font-medium transition-all duration-200 select-none focus:outline-none whitespace-nowrap"
        :class="[
          tab.id === modelValue
            ? 'text-lumora-primary font-semibold'
            : 'text-lumora-secondary hover:text-lumora-primary'
        ]"
      >
        <span>{{ tab.label }}</span>
        <!-- Underline active state -->
        <span
          v-if="tab.id === modelValue"
          class="absolute bottom-0 left-0 right-0 h-[2px] bg-lumora-accent"
        ></span>
      </button>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface TabOption {
  id: string;
  label: string;
}

interface Props {
  modelValue: string;
  tabs: TabOption[];
}

defineProps<Props>();
defineEmits<{
  (e: 'update:modelValue', id: string): void;
}>();
</script>
