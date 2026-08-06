<template>
  <div class="flex flex-col gap-2 w-full text-left">
    <label v-if="label" class="text-[11px] font-semibold text-lumora-secondary tracking-widest uppercase">
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full bg-lumora-surface/70 text-lumora-primary placeholder-lumora-secondary/60 border rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none disabled:opacity-50 disabled:pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
        :class="[
          $slots.trailing && 'pr-11',
          error 
            ? 'border-red-500/50 focus:border-red-500/70 focus:ring-4 focus:ring-red-500/10' 
            : 'border-lumora-accent/20 hover:border-lumora-accent/40 focus:border-lumora-highlight/60 focus:ring-4 focus:ring-white/[0.06]'
        ]"
      />
      <div v-if="$slots.trailing" class="absolute right-2.5 flex items-center">
        <slot name="trailing" />
      </div>
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
