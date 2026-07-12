<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="transform translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-lumora-surface border border-lumora-accent/20 rounded-xl p-4 shadow-2xl max-w-sm"
      >
        <!-- Icon -->
        <component
          :is="iconComponent"
          class="w-5 h-5 flex-shrink-0"
          :class="[
            type === 'success' && 'text-emerald-400',
            type === 'info' && 'text-blue-400',
            type === 'error' && 'text-red-400'
          ]"
        />

        <!-- Message -->
        <p class="text-sm font-medium text-lumora-primary pr-4">{{ message }}</p>

        <!-- Close -->
        <button
          @click="$emit('close')"
          class="text-lumora-secondary hover:text-lumora-primary p-0.5 rounded-lg hover:bg-white/5 transition-colors focus:outline-none ml-auto"
        >
          <XIcon class="w-4 h-4" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CheckCircle2, Info, AlertTriangle, X as XIcon } from '@lucide/vue';

interface Props {
  show: boolean;
  message: string;
  type?: 'success' | 'info' | 'error';
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  type: 'success',
});

defineEmits<{
  (e: 'close'): void;
}>();

const iconComponent = computed(() => {
  if (props.type === 'success') return CheckCircle2;
  if (props.type === 'error') return AlertTriangle;
  return Info;
});
</script>
