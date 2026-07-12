<template>
  <div class="flex flex-col gap-2 w-full text-left">
    <label v-if="label" class="text-xs font-semibold text-lumora-primary tracking-wider uppercase">
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full bg-lumora-surface text-lumora-primary placeholder-lumora-secondary/70 border rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none disabled:opacity-50 disabled:pointer-events-none"
        :class="[
          error 
            ? 'border-red-500/50 focus:border-red-500' 
            : 'border-lumora-accent/25 hover:border-lumora-accent focus:border-lumora-highlight'
        ]"
      />
    </div>
    <span v-if="error" class="text-xs text-red-400 mt-1 select-none">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  label: '',
  error: '',
});

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>
