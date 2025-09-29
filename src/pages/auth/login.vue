<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <Icon name="mdi:steering" class="mx-auto h-10 w-10 text-brand-500" />
          <h1 class="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{{ $t('auth.welcome') }}</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('auth.signInSubtitle') }}</p>
        </div>
      </template>

      <UForm class="space-y-4" @submit.prevent="signIn">
        <UFormGroup :label="$t('auth.email')">
          <UInput v-model="email" type="email" required />
        </UFormGroup>
        <UFormGroup :label="$t('auth.password')">
          <UInput v-model="password" type="password" required />
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
const client = useSupabaseClient()
const loading = ref(false)
const email = ref('')
const password = ref('')

const signIn = async () => {
  loading.value = true
  const { error } = await client.auth.signInWithPassword({ email: email.value, password: password.value })
  loading.value = false
  if (error) {
    useToast().add({ title: 'Error', description: error.message, color: 'rose' })
    return
  }
  navigateTo('/')
}
</script>
