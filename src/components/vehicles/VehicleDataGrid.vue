<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
    <UTable :rows="vehicles" :columns="columns" class="bg-white/70 dark:bg-slate-900/60" @select="onSelect">
      <template #plate-data="{ row }">
        <div class="font-medium text-slate-900 dark:text-white">{{ row.plate }}</div>
        <p class="text-xs text-slate-500 dark:text-slate-400">VIN: {{ row.vin }}</p>
      </template>
      <template #status-data="{ row }">
        <VehicleStatusBadge :status="row.status" />
      </template>
      <template #nextCheck-data="{ row }">
        <span class="text-sm text-slate-600 dark:text-slate-300">{{ formatDate(row.nextCheck) }}</span>
      </template>
      <template #actions-data="{ row }">
        <div class="flex items-center gap-2">
          <UButton size="xs" color="gray" variant="ghost" icon="i-mdi-note-edit" @click.stop="edit(row.id)" />
          <UButton size="xs" color="gray" variant="ghost" icon="i-mdi-file-download" @click.stop="download(row.id)" />
        </div>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { VehicleListItem } from '~/types/vehicles'

interface Props {
  vehicles: VehicleListItem[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [string] }>()

const columns = [
  { key: 'plate', label: 'Plate' },
  { key: 'make', label: 'Make' },
  { key: 'model', label: 'Model' },
  { key: 'year', label: 'Year' },
  { key: 'status', label: 'Status' },
  { key: 'odometer', label: 'Odometer' },
  { key: 'nextCheck', label: 'Next Check' },
  { key: 'actions', label: '', sortable: false }
]

const onSelect = (row: VehicleListItem) => {
  emit('select', row.id)
}

const edit = (id: string) => emit('select', id)
const download = (id: string) => {
  // placeholder for future export per vehicle
}

const formatDate = (value?: string) => {
  if (!value) return '—'
  return format(new Date(value), 'PP')
}
</script>
