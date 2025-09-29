<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <Icon name="lucide:steering-wheel" class="mx-auto h-10 w-10 text-brand-500" />
          <h1 class="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{{ $t('auth.welcome') }}</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('auth.signInSubtitle') }}</p>
        </div>
      </template>

      <UForm :state="form" class="space-y-4" @submit.prevent="signIn">
        <UFormGroup :label="$t('auth.email')">
          <UInput v-model="form.email" type="email" required />
        </UFormGroup>
        <UFormGroup :label="$t('auth.password')">
          <UInput v-model="form.password" type="password" required />
        </UFormGroup>
        <UButton :loading="loading" type="submit" block>{{ $t('auth.signIn') }}</UButton>
      </UForm>
      <template #footer>
        <p class="text-center text-xs text-slate-500 dark:text-slate-400">{{ $t('auth.trialNotice') }}</p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">

import { useToast } from '#imports'

const authStore = useAuthStore()
const toast = useToast()
const loading = computed(() => authStore.loading)
const form = reactive({
  email: '',
  password: ''
})

const signIn = async () => {
  const success = await authStore.signIn({ email: form.email, password: form.password })
  if (!success) {
    toast.add({ title: 'Error', description: authStore.error ?? 'Unable to sign in', color: 'rose' })
    return
  }
  navigateTo('/')
}
</script>
