<template>
  <div class="w-full overflow-x-auto rounded-[16px] border border-lumora-accent/10 bg-lumora-surface">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b border-lumora-accent/10 bg-black/20">
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-lumora-primary select-none"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-lumora-accent/10">
        <tr
          v-for="(row, idx) in data"
          :key="idx"
          class="hover:bg-[#1a1a1a] transition-colors duration-150"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-6 py-4.5 text-sm text-lumora-secondary"
          >
            <slot :name="col.key" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td :colspan="columns.length" class="px-6 py-12 text-center text-sm text-lumora-secondary">
            <slot name="empty">No records found.</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  data: any[];
}

defineProps<Props>();
</script>
