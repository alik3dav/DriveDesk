<template>
  <div class="rounded-2xl border border-slate-200 bg-white/70 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
    <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
      <div>
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('dashboard.alertsTitle') }}</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('dashboard.alertsDescription') }}</p>
      </div>
      <UButton to="/settings/notifications" color="gray" variant="ghost" size="sm">
        {{ $t('dashboard.configureAlerts') }}
      </UButton>
    </header>
    <div class="divide-y divide-slate-200 dark:divide-slate-800">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        class="flex items-center justify-between px-6 py-4 text-sm"
      >
        <div class="flex items-center gap-3">
          <VehicleStatusBadge :status="alert.status" />
          <div>
            <p class="font-medium text-slate-900 dark:text-white">{{ alert.title }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ alert.description }}</p>
          </div>
        </div>
        <UButton :to="`/vehicles/${alert.vehicleId}`" size="xs" color="gray" variant="soft">
          {{ $t('common.viewDetails') }}
        </UButton>
      </div>
      <p v-if="!alerts.length" class="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
        {{ $t('dashboard.noAlerts') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardAlert } from '~/types/dashboard'

interface Props {
  alerts: DashboardAlert[]
}

const props = defineProps<Props>()
</script>
