<template>
  <Card padding="lg" class="w-full max-w-md mx-auto shadow-2xl border-white/10 bg-lumora-surface/80 backdrop-blur-xl !p-7">
    <!-- Brand / Header -->
    <div class="flex flex-col items-center gap-2 mb-6 text-center">
      <div class="w-12 h-12 bg-lumora-accent text-lumora-bg rounded-2xl flex items-center justify-center text-2xl font-black select-none shadow-lg shadow-white/5 mb-1">
        L
      </div>
      <h2 class="font-outfit text-2xl font-extrabold tracking-tight text-lumora-primary">
        Welcome back
      </h2>
      <p class="text-lumora-secondary text-[13px] leading-relaxed max-w-xs font-light">
        Log in to access your courses, track progress, and explore programs.
      </p>
    </div>

    <!-- Credential form (primary action) -->
    <form @submit.prevent="handleLogin" class="flex flex-col gap-3.5">
      <Input
        v-model="email"
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        :error="emailError"
        autocomplete="email"
      />
      <Input
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        placeholder="Enter your password"
        :error="passwordError"
        autocomplete="current-password"
      >
        <template #trailing>
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="p-1.5 rounded-lg text-lumora-secondary hover:text-lumora-primary hover:bg-white/5 transition-colors duration-200"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :title="showPassword ? 'Hide password' : 'Show password'"
          >
            <EyeOff v-if="showPassword" class="w-4 h-4" />
            <Eye v-else class="w-4 h-4" />
          </button>
        </template>
      </Input>

      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2.5 text-[13px] text-lumora-secondary cursor-pointer select-none group">
          <input type="checkbox" class="peer sr-only" />
          <span class="relative w-4 h-4 rounded-md border border-lumora-accent/25 bg-lumora-surface/70 flex items-center justify-center transition-all duration-200 peer-checked:bg-lumora-accent peer-checked:border-lumora-accent group-hover:border-lumora-accent/50">
            <svg class="w-2.5 h-2.5 text-lumora-bg scale-0 transition-transform duration-200 peer-checked:scale-100" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6.5 5 9l4.5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="group-hover:text-lumora-primary transition-colors">Remember me</span>
        </label>
        <a href="#" class="text-[13px] font-medium text-lumora-accent hover:text-lumora-highlight hover:underline underline-offset-4 transition-colors duration-200">
          Forgot password?
        </a>
      </div>

      <Button type="submit" variant="primary" class="w-full !py-3 !text-sm mt-1 shadow-lg shadow-white/5 group">
        Sign In
        <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Button>
    </form>

    <!-- Divider -->
    <div class="flex items-center gap-4 my-4">
      <span class="flex-1 h-px bg-white/[0.08]"></span>
      <span class="text-[11px] uppercase tracking-widest text-lumora-secondary/60 font-medium select-none">or</span>
      <span class="flex-1 h-px bg-white/[0.08]"></span>
    </div>

    <!-- Social sign-in (UI only) -->
    <button
      type="button"
      class="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-lumora-primary bg-transparent border border-lumora-accent/20 hover:bg-white/[0.04] hover:border-lumora-accent/40 active:scale-[0.99] transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/[0.06]"
    >
      <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
        <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z" />
        <path fill="#FBBC05" d="M5.27 14.29a7.19 7.19 0 0 1 0-4.58V6.62H1.29a12.04 12.04 0 0 0 0 10.76l3.98-3.09z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
      </svg>
      <span>Continue with Google</span>
    </button>

    <!-- Inline sign-up prompt -->
    <div class="mt-4 pt-4 border-t border-white/[0.08] text-center text-[13px]">
      <span class="text-lumora-secondary font-light">Don't have an account? </span>
      <router-link to="/signup" class="text-lumora-accent font-semibold hover:text-lumora-highlight hover:underline underline-offset-4 transition-colors duration-200">
        Sign up
      </router-link>
    </div>

    <!-- Security note -->
    <div class="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-lumora-secondary/50">
      <ShieldCheck class="w-3.5 h-3.5" />
      <span>Protected by enterprise-grade security</span>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Card from '@/components/Card.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { Eye, EyeOff, ArrowRight, ShieldCheck } from '@lucide/vue';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const showPassword = ref(false);

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
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

  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/dashboard');
  } catch {
    passwordError.value = 'Invalid email or password';
  }
};
</script>
