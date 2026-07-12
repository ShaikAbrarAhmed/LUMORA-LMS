<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <div>
      <button
        type="button"
        @click="isOpen = !isOpen"
        class="inline-flex items-center justify-between w-full bg-lumora-surface text-lumora-primary border border-lumora-accent/25 rounded-xl px-4 py-2.5 text-sm font-medium hover:border-lumora-accent focus:outline-none transition-all duration-200"
      >
        <span>{{ selectedLabel || placeholder }}</span>
        <ChevronDownIcon class="w-4 h-4 text-lumora-secondary transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-lumora-surface border border-lumora-accent/20 shadow-xl overflow-hidden"
      >
        <div class="py-1">
          <button
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option.value)"
            class="block w-full text-left px-4 py-2.5 text-sm transition-colors duration-150"
            :class="[
              option.value === modelValue
                ? 'bg-lumora-highlight/10 text-lumora-primary font-semibold'
                : 'text-lumora-secondary hover:text-lumora-primary hover:bg-[#1d1d1d]'
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ChevronDown as ChevronDownIcon } from '@lucide/vue';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue: string | number;
  options: Option[];
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select option',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.label : '';
});

const selectOption = (value: string | number) => {
  emit('update:modelValue', value);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
