<template>
  <Card padding="lg" class="w-full max-w-md mx-auto shadow-2xl relative">
    <div class="flex flex-col items-center gap-2 mb-6 text-center">
      <div class="w-12 h-12 bg-lumora-accent text-lumora-bg rounded-xl flex items-center justify-center text-2xl font-black mb-2 select-none">
        L
      </div>
      <h2 class="text-2xl font-bold text-lumora-primary">
        Welcome Back
      </h2>
      <p class="text-lumora-secondary text-xs leading-relaxed max-w-xs">
        Log in to access your courses, track your learning progress, and explore programs.
      </p>
    </div>

    <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
      <Input
        v-model="email"
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        :error="emailError"
      />
      <Input
        v-model="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        :error="passwordError"
      />

      <div class="flex items-center justify-between mt-1 text-xs">
        <label class="flex items-center gap-2 text-lumora-secondary cursor-pointer select-none">
          <input
            type="checkbox"
            class="accent-lumora-accent rounded border-lumora-accent/25 bg-lumora-surface text-lumora-bg focus:ring-lumora-highlight"
          />
          <span>Remember me</span>
        </label>
        <a href="#" class="text-lumora-accent hover:underline">Forgot password?</a>
      </div>

      <Button type="submit" variant="primary" class="w-full mt-2">
        Sign In
      </Button>
    </form>

    <template #footer>
      <div class="w-full text-center text-xs">
        <span class="text-lumora-secondary">Don't have an account? </span>
        <router-link to="/signup" class="text-lumora-accent font-semibold hover:underline">Sign up</router-link>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Card from '@/components/Card.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = () => {
  emailError.value = '';
  passwordError.value = '';

  if (!email.value) {
    emailError.value = 'Email is required';
    return;
  }
  if (!password.value) {
    passwordError.value = 'Password is required';
    return;
  }

  authStore.login();
  router.push('/dashboard');
};
</script>
