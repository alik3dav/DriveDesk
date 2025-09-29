<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
    <div class="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div class="text-center">
        <Icon name="lucide:steering-wheel" class="mx-auto h-10 w-10 text-brand-500" />
        <h1 class="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{{ $t('auth.welcome') }}</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('auth.signInSubtitle') }}</p>
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="signIn">
        <div class="space-y-1">
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-200" for="email">
            {{ $t('auth.email') }}
          </label>
          <input
            id="email"
            v-model="form.email"
            class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            type="email"
            required
          />
        </div>
        <div class="space-y-1">
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-200" for="password">
            {{ $t('auth.password') }}
          </label>
          <input
            id="password"
            v-model="form.password"
            class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            type="password"
            required
          />
        </div>
        <button
          class="flex w-full items-center justify-center rounded-md bg-brand-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200 disabled:cursor-not-allowed disabled:bg-brand-300"
          :disabled="loading"
          type="submit"
        >
          <span v-if="!loading">{{ $t('auth.signIn') }}</span>
          <span v-else>Loading...</span>
        </button>
      </form>

      <p class="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">{{ $t('auth.trialNotice') }}</p>
      <p v-if="errorMessage" class="mt-4 text-center text-sm text-rose-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const loading = computed(() => authStore.loading)
const form = reactive({
  email: '',
  password: ''
})
const errorMessage = ref('')

const signIn = async () => {
  errorMessage.value = ''
  const success = await authStore.signIn({ email: form.email, password: form.password })
  if (!success) {
    errorMessage.value = authStore.error ?? 'Unable to sign in'
    return
  }
  navigateTo('/')
}
</script>
