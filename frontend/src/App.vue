<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PublicLayout from '@/layouts/PublicLayout.vue';
import StudentLayout from '@/layouts/StudentLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const route = useRoute();

const layouts = {
  public: PublicLayout,
  student: StudentLayout,
  auth: AuthLayout,
};

const currentLayout = computed(() => {
  const layoutName = route.meta.layout as keyof typeof layouts;
  return layouts[layoutName] || PublicLayout;
});
</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>


<style>
:root {
  --bg-color: #0A0A0A;
  --text-primary: #FFFFFF;
  --text-secondary: #A8A8A8;
  --accent-color: #D9D9D9;
  --highlight-color: #F5F5F5;
  --card-bg: #141414;
  --card-border: rgba(217, 217, 217, 0.1);
  --primary-glow: rgba(255, 255, 255, 0.02);
  --secondary-glow: rgba(217, 217, 217, 0.015);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: var(--bg-color);
}
::-webkit-scrollbar-thumb {
  background: rgba(217, 217, 217, 0.15);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(217, 217, 217, 0.3);
}

/* Custom Selection */
::selection {
  background-color: rgba(217, 217, 217, 0.2);
  color: #FFFFFF;
}

/* Ambient glow sphere animations if used globally */
.glow-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 1;
  pointer-events: none;
}

.sphere-1 {
  width: 400px;
  height: 400px;
  background: var(--primary-glow);
  top: 15%;
  left: 20%;
  animation: float1 12s ease-in-out infinite alternate;
}

.sphere-2 {
  width: 450px;
  height: 450px;
  background: var(--secondary-glow);
  bottom: 10%;
  right: 15%;
  animation: float2 15s ease-in-out infinite alternate;
}

@keyframes float1 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 15px) scale(1.05); }
}

@keyframes float2 {
  0% { transform: translate(0, 0) scale(1.05); }
  100% { transform: translate(-20px, -25px) scale(0.95); }
}
</style>
