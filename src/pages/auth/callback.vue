<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <Icon name="mdi:steering" class="mx-auto h-12 w-12 animate-spin text-brand-500" />
      <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">{{ $t('auth.completingSignIn') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/supabase'

const client = useSupabaseClient<Database>()
const route = useRoute()

onMounted(async () => {
  const query = new URLSearchParams(route.query as Record<string, string | string[]>).toString()
  await client.auth.exchangeCodeForSession(query)
  await navigateTo('/')
})
</script>
