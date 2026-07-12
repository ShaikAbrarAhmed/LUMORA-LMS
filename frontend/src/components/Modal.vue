<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-md" @click="$emit('close')"></div>

        <!-- Dialog Box -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-4 scale-95"
        >
          <div
            v-if="show"
            class="relative w-full max-w-lg bg-lumora-surface border border-lumora-accent/20 rounded-[20px] shadow-2xl p-6 md:p-8 z-10 flex flex-col text-left overflow-hidden"
          >
            <!-- Close Button -->
            <button
              @click="$emit('close')"
              class="absolute top-4 right-4 p-1.5 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <XIcon class="w-5 h-5" />
            </button>

            <!-- Header -->
            <div class="mb-4">
              <h3 class="text-xl font-bold text-lumora-primary">
                <slot name="title">{{ title }}</slot>
              </h3>
            </div>

            <!-- Content -->
            <div class="mb-6 text-sm text-lumora-secondary leading-relaxed">
              <slot />
            </div>

            <!-- Actions Footer -->
            <div class="flex items-center justify-end gap-3 border-t border-lumora-accent/10 pt-4 mt-2">
              <slot name="actions" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X as XIcon } from '@lucide/vue';

interface Props {
  show: boolean;
  title?: string;
}

withDefaults(defineProps<Props>(), {
  show: false,
  title: '',
});

defineEmits<{
  (e: 'close'): void;
}>();
</script>
