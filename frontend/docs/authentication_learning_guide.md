# LUMORA-LMS Authentication Architecture: Learning Guide

Welcome to the learning guide for the LUMORA-LMS frontend authentication system. This guide walks you through the architectural decisions, code structure, and engineering best practices used to build a robust, scalable, and production-ready authentication flow.

## 1. Purpose

The goal of this implementation is to provide a fully functional, secure, and maintainable authentication system that connects the Vue 3 frontend to the Frappe backend. 

**Problems solved:**
- **Security:** Tokens are securely managed and attached to outgoing requests.
- **State Consistency:** Pinia acts as the single source of truth for user data and auth state.
- **User Experience (UX):** Automatic session restoration on page reload, protected routes, and loading/error states.
- **Maintainability:** Separation of concerns between API requests, state management, and route protection.

---

## 2. Code Walkthrough

### `src/utils/token.ts`
**What it does:** Centralizes token retrieval, storage, and deletion using `localStorage`.
**Why it exists:** Avoids scattering `localStorage.getItem('lumora_token')` throughout the app. If we ever switch to cookies or `sessionStorage`, we only update this one file.
**When it executes:** Whenever a user logs in, logs out, or makes an API request.

### `src/types/auth.ts`
**What it does:** Defines TypeScript interfaces (`User`, `LoginCredentials`, `AuthResponse`).
**Why it exists:** Provides strong typing for API responses and function payloads. It prevents runtime errors by ensuring the frontend expects the correct data structure from Frappe.

### `src/services/api/axios.ts`
**What it does:** Configures the global Axios instance. We updated the **Request Interceptor** to pull the token via `getToken()` and inject it as a `Bearer` header.
**Why it exists:** Automatically authenticates all backend requests without needing to manually pass the token in every service call.

### `src/services/auth.service.ts`
**What it does:** Houses all API calls related to authentication (`login`, `signup`, `logout`, `getCurrentUser`).
**Why it exists:** Decouples API logic from UI components and State Stores. If Frappe changes an endpoint URL, you only fix it here.
**Important Note:** We removed the mock fallbacks to ensure it’s production-ready. 

### `src/stores/auth.ts`
**What it does:** The Pinia store managing `user`, `isAuthenticated`, `isLoading`, and `error` state.
**Why it exists:** Acts as the central nervous system for authentication. Components can reactively display the user's name or show a loading spinner while the store handles the API calls.
**When it executes:** Components call `authStore.login()`. The store calls `authService.login()`, updates its state, and then the UI updates automatically.
**Key Feature:** `initAuth()` runs on app startup to restore the session if a token exists in `localStorage`.

### `src/router/guards.ts`
**What it does:** Contains global navigation guards. Checks if a user can access a route.
**Why it exists:** Prevents unauthenticated users from accessing `/dashboard` and logged-in users from accessing `/login`. It was extracted from `router/index.ts` to keep the router configuration clean (Clean Architecture).

---

## 3. Concepts Used

- **Separation of Concerns (SoC):** Splitting logic into types, utils, services, stores, and routers so each file does only one thing.
- **Pinia State Management:** Managing global reactive state outside of Vue components.
- **Axios Interceptors:** Middleware for HTTP requests that automatically attaches auth tokens.
- **Vue Router Guards (`beforeEach`):** Middleware for navigation that intercepts route changes to enforce security (Protected Routes).
- **Clean Architecture:** Ensuring business logic (Services/Stores) is independent of the UI layer (Vue components).
- **TypeScript Interfaces:** Defining contracts for data shapes to prevent bugs.
- **Session Restoration:** Hydrating application state from persistent storage (`localStorage`) on hard reloads.

---

## 4. Project Integration

- **App Initialization:** `App.vue` or `main.ts` should call `authStore.initAuth()` before mounting the app to prevent UI flashing.
- **Components:** UI components like `Login.vue` or `Navbar.vue` will consume `authStore` to trigger logins or display the user's avatar.
- **Future Features:** The `auth.service.ts` sets the foundation for features like Password Reset, Email Verification, and Role-Based Access Control (RBAC).

---

## 5. Best Practices

- **No Hardcoded Tokens:** Tokens are managed securely and dynamically.
- **Single Source of Truth:** Pinia ensures that if the user's name changes, it updates everywhere simultaneously.
- **Error Handling:** Try/Catch blocks in the store ensure that API failures are gracefully handled and surfaced to the UI.
- **Modular Routing:** Extracting route guards into `guards.ts` keeps `index.ts` scalable as the app grows to hundreds of routes.
- **Strong Typing:** TypeScript guarantees that if the backend changes the user object, the frontend will throw compile errors, preventing production crashes.

---

## 6. Common Mistakes

- **Mistake:** Calling APIs directly inside Vue components (`Login.vue`).
  - **Consequence:** Code duplication, hard to test, UI becomes tightly coupled to the backend.
  - **Fix:** Abstract APIs into `services/` and state into `stores/`.
- **Mistake:** Forgetting to clear the token on logout.
  - **Consequence:** Security risk; a new user on the same computer could access the previous session.
  - **Fix:** Always use a central `removeToken()` utility.
- **Mistake:** Not handling the initial page load (F5 refresh).
  - **Consequence:** The user is logged out visually because Vue's memory is wiped on refresh.
  - **Fix:** The `initAuth()` method solves this by checking `localStorage` and fetching the user on boot.

---

## 7. Interview Preparation

**Key Definitions:**
- **JWT (JSON Web Token):** A secure string used to authenticate API requests.
- **Interceptor:** A function that intercepts HTTP requests/responses to modify them globally (e.g., adding a token).
- **Route Guard:** A function that executes before navigation to authorize access.

**Common Interview Questions:**
1. *How do you keep a user logged in after a page refresh in a SPA?*
   - Answer: Store the auth token in `localStorage`/cookies. On app initialization, check for the token. If it exists, fetch the user's profile from the backend to restore state before rendering the app.
2. *Why use an Axios Interceptor instead of manually passing the token?*
   - Answer: It follows DRY (Don't Repeat Yourself). It guarantees every request is authenticated without cluttering service files.
3. *What is the difference between a Store and a Service?*
   - Answer: A Service communicates with the outside world (APIs). A Store manages internal application state (memory) and reacts to the UI.

---

## 8. Learning Summary

**What we learned today:**
- How to architect a production-grade authentication flow.
- The responsibilities of different layers (Utils, Types, Services, Stores, Router).
- How to securely manage tokens and protect routes.

**Key Takeaways:**
- Never use mock data in production services.
- Always use TypeScript interfaces for API contracts.
- Centralize logic to make future refactoring easier.

**Suggested Next Topics:**
- Explore **Role-Based Access Control (RBAC)** to restrict certain routes to Admins vs. Students.
- Study **Refresh Token Flows** to silently keep users logged in without requiring them to re-enter passwords when tokens expire.
