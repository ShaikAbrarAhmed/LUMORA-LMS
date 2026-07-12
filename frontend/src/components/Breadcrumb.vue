<template>
  <nav class="flex mb-4" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1.5 md:space-x-2.5">
      <li v-for="(item, index) in items" :key="index" class="inline-flex items-center">
        <!-- Separator -->
        <span v-if="index > 0" class="mx-1.5 md:mx-2.5 text-xs text-lumora-secondary select-none">/</span>
        
        <!-- Link or Text -->
        <router-link
          v-if="item.path && index < items.length - 1"
          :to="item.path"
          class="inline-flex items-center text-xs font-medium text-lumora-secondary hover:text-lumora-primary transition-colors duration-200"
        >
          {{ item.name }}
        </router-link>
        <span
          v-else
          class="text-xs font-semibold text-lumora-primary cursor-default"
        >
          {{ item.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

defineProps<Props>();
</script>
