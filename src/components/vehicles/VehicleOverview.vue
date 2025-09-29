<template>
  <div class="grid gap-4 md:grid-cols-3">
    <UCard class="md:col-span-2">
      <template #header>
        <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('vehicles.specifications') }}</h3>
      </template>
      <dl class="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
        <div>
          <dt class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ $t('vehicles.make') }}</dt>
          <dd>{{ vehicle.make }}</dd>
        </div>
        <div>
          <dt class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ $t('vehicles.model') }}</dt>
          <dd>{{ vehicle.model }}</dd>
        </div>
        <div>
          <dt class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ $t('vehicles.year') }}</dt>
          <dd>{{ vehicle.year }}</dd>
        </div>
        <div>
          <dt class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ $t('vehicles.vin') }}</dt>
          <dd>{{ vehicle.vin }}</dd>
        </div>
        <div>
          <dt class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ $t('vehicles.status') }}</dt>
          <dd><VehicleStatusBadge :status="vehicle.status" /></dd>
        </div>
        <div>
          <dt class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ $t('vehicles.odometer') }}</dt>
          <dd>{{ vehicle.odometer.toLocaleString() }} km</dd>
        </div>
      </dl>
    </UCard>
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('vehicles.subscriptionStatus') }}</h3>
      </template>
      <TrialStatus :trial="vehicle.trial" />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { VehicleDetail } from '~/types/vehicles'

interface Props {
  vehicle: VehicleDetail
}

const props = defineProps<Props>()
</script>
