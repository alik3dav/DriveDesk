<template>
  <aside
    class="flex h-full w-[var(--sidebar-width)] flex-col border-r border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
  >
    <div class="flex h-16 items-center gap-2 px-6">
      <Icon name="lucide:steering-wheel" class="h-8 w-8 text-brand-500" />
      <div>
        <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ appName }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">Fleet Maintenance Manager</p>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto px-4">
      <NuxtLink
        v-for="item in navigation"
        :key="item.to"
        :to="item.to"
        class="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        :class="{ 'bg-brand-500 text-white hover:bg-brand-600 dark:hover:bg-brand-600': isActive(item.to) }"
      >
        <Icon :name="item.icon" class="h-5 w-5" />
        <span>{{ $t(item.label) }}</span>
      </NuxtLink>
    </nav>

    <div class="border-t border-slate-200 px-6 py-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <p>{{ $t('common.version') }} {{ version }}</p>
      <p class="mt-1">© {{ new Date().getFullYear() }} DriveDesk</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const version = '0.1.0'

const navigation = [
  { to: '/', icon: 'lucide:layout-dashboard', label: 'navigation.dashboard' },
  { to: '/vehicles', icon: 'lucide:car', label: 'navigation.vehicles' },
  { to: '/checks', icon: 'lucide:clipboard-check', label: 'navigation.checks' },
  { to: '/calendar', icon: 'lucide:calendar-days', label: 'navigation.calendar' },
  { to: '/reports', icon: 'lucide:chart-column', label: 'navigation.reports' },
  { to: '/files', icon: 'lucide:files', label: 'navigation.files' },
  { to: '/settings', icon: 'lucide:settings', label: 'navigation.settings' }
] as const

const appName = computed(() => config.public.appName)

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>
