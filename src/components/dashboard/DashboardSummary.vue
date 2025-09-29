<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div
      v-for="metric in metrics"
      :key="metric.key"
      class="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm transition hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900/60"
    >
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ metric.label }}</p>
        <Icon :name="metric.icon" class="h-5 w-5 text-brand-500" />
      </div>
      <p class="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{{ metric.value }}</p>
      <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">{{ metric.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardMetric } from '~/types/dashboard'

interface Props {
  metrics: DashboardMetric[]
}

const props = defineProps<Props>()
</script>
