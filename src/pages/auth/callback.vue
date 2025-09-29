<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <Icon name="mdi:steering" class="mx-auto h-12 w-12 animate-spin text-brand-500" />
      <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">{{ $t('auth.completingSignIn') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const route = useRoute()

onMounted(async () => {
  await client.auth.exchangeCodeForSession(route.query)
  await navigateTo('/')
})
</script>
