<template>
  <div class="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ vehicle.displayName }}</h1>
          <VehicleStatusBadge :status="vehicle.status" />
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400">VIN {{ vehicle.vin }} · {{ vehicle.year }}</p>
        <div class="mt-3 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>{{ $t('vehicles.odometer') }}: {{ vehicle.odometer.toLocaleString() }} km</span>
          <span>{{ $t('vehicles.lastService') }}: {{ formatDate(vehicle.lastService) }}</span>
          <span>{{ $t('vehicles.nextService') }}: {{ formatDate(vehicle.nextService) }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <UButton color="gray" variant="soft" icon="i-mdi-clock-alert" @click="$emit('update')">
          {{ $t('vehicles.logCheck') }}
        </UButton>
        <UButton icon="i-mdi-note-edit" @click="$emit('edit')">
          {{ $t('common.edit') }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { VehicleDetail } from '~/types/vehicles'

interface Props {
  vehicle: VehicleDetail
}

const props = defineProps<Props>()

defineEmits<{ update: []; edit: [] }>()

const formatDate = (date?: string | Date) => {
  if (!date) return '—'
  return format(new Date(date), 'PP')
}
</script>
