<template>
  <div class="flex flex-wrap gap-2">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-200"
      :class="{ 'bg-brand-500 text-white hover:text-white': route.path === item.to }"
    >
      {{ $t(item.label) }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const items = [
  { to: '/settings/profile', label: 'settings.profile' },
  { to: '/settings/notifications', label: 'settings.notifications' },
  { to: '/settings/checks', label: 'settings.checks' },
  { to: '/settings/subscription', label: 'settings.subscription' }
]
</script>
