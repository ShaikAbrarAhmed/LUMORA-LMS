<script setup lang="ts">
import { ref } from 'vue';

const appName = ref('LUMORA LMS');
const systemVersion = ref('v1.0.0-alpha');
const buildStatus = ref('System Architecture Initialized');
</script>

<template>
  <main class="container">
    <div class="glow-sphere sphere-1"></div>
    <div class="glow-sphere sphere-2"></div>
    
    <section class="card">
      <header class="card-header">
        <span class="badge">{{ systemVersion }}</span>
      </header>
      
      <div class="brand">
        <div class="logo-mark">L</div>
        <h1 class="title">{{ appName }}</h1>
      </div>
      
      <p class="description">
        A next-generation, decoupled Learning Management System built with Vue 3, Vite, and Frappe framework.
      </p>

      <div class="status-panel">
        <div class="pulse-indicator"></div>
        <span class="status-text">{{ buildStatus }}</span>
      </div>

      <div class="architecture-grid">
        <div class="arch-item">
          <h4>Client</h4>
          <span>Vue 3 / TypeScript</span>
        </div>
        <div class="arch-item">
          <h4>Core Engine</h4>
          <span>Frappe / Python</span>
        </div>
        <div class="arch-item">
          <h4>Orchestration</h4>
          <span>Docker / Nginx</span>
        </div>
      </div>
      
      <footer class="card-footer">
        <p>&copy; 2026 Lumora LMS. All rights reserved.</p>
      </footer>
    </section>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

:root {
  --bg-color: #0b0f19;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --primary-glow: rgba(99, 102, 241, 0.15);
  --secondary-glow: rgba(236, 72, 153, 0.15);
  --card-bg: rgba(17, 24, 39, 0.7);
  --card-border: rgba(255, 255, 255, 0.08);
  --accent-color: #6366f1;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

/* Ambient glow effects */
.glow-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 1;
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
  100% { transform: translate(50px, 30px) scale(1.1); }
}

@keyframes float2 {
  0% { transform: translate(0, 0) scale(1.1); }
  100% { transform: translate(-40px, -50px) scale(0.9); }
}

/* Premium glassmorphic card container */
.card {
  position: relative;
  z-index: 10;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  width: 100%;
  max-width: 540px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: cardFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.badge {
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.logo-mark {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  transition: transform 0.3s ease;
}

.logo-mark:hover {
  transform: rotate(5deg) scale(1.05);
}

.title {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(to right, #ffffff, #d1d5db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  font-weight: 300;
  margin-bottom: 30px;
}

.status-panel {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 8px 16px;
  border-radius: 12px;
  margin-bottom: 35px;
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse 1.6s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.status-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: #34d399;
}

.architecture-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 30px;
}

.arch-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 12px 8px;
  transition: background 0.3s, border-color 0.3s;
}

.arch-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.arch-item h4 {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.arch-item span {
  font-size: 0.75rem;
  color: #a5b4fc;
  font-weight: 400;
}

.card-footer {
  font-size: 0.75rem;
  color: rgba(156, 163, 175, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 20px;
  margin-top: 10px;
}
</style>
