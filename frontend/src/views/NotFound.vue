<template>
  <Card padding="lg" class="text-center max-w-md mx-auto shadow-2xl relative">
    <h2 class="text-7xl font-black text-lumora-primary mb-4 tracking-tighter">
      404
    </h2>
    <h3 class="text-xl font-bold text-lumora-primary mb-2 select-none">Page Not Found</h3>
    <p class="text-lumora-secondary text-sm leading-relaxed mb-6">
      The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
    </p>
    <div class="flex justify-center">
      <router-link to="/">
        <Button variant="primary">
          Back to Home
        </Button>
      </router-link>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
</script>
