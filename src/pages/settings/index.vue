<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ $t('settings.title') }}</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('settings.subtitle') }}</p>
    </div>
    <SettingsNavigation />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

if (route.path === '/settings') {
  navigateTo('/settings/profile', { replace: true })
}
</script>
