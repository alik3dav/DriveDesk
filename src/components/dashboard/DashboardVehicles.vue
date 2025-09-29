<template>
  <div class="rounded-2xl border border-slate-200 bg-white/70 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
    <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
      <div>
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('dashboard.fleetHealth') }}</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('dashboard.fleetHealthDescription') }}</p>
      </div>
      <UButton to="/vehicles" size="sm">{{ $t('navigation.vehicles') }}</UButton>
    </header>
    <div class="divide-y divide-slate-200 dark:divide-slate-800">
      <div
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        class="flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p class="text-sm font-medium text-slate-900 dark:text-white">{{ vehicle.displayName }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ vehicle.make }} · {{ vehicle.model }} · {{ vehicle.year }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <VehicleStatusBadge :status="vehicle.status" />
          <div class="text-xs text-slate-500 dark:text-slate-400">
            <p>{{ $t('vehicles.odometer') }}: {{ vehicle.odometer.toLocaleString() }} km</p>
            <p>{{ $t('vehicles.nextService') }}: {{ formatDate(vehicle.nextService) }}</p>
          </div>
        </div>
        <UButton :to="`/vehicles/${vehicle.id}`" color="gray" variant="soft" size="xs">{{ $t('common.viewDetails') }}</UButton>
      </div>
      <p v-if="!vehicles.length" class="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
        {{ $t('dashboard.noVehicles') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { DashboardVehicleSummary } from '~/types/dashboard'

interface Props {
  vehicles: DashboardVehicleSummary[]
}

const props = defineProps<Props>()

const formatDate = (date?: string | Date) => {
  if (!date) return '—'
  return format(new Date(date), 'PP')
}
</script>
