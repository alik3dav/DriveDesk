<template>
  <div class="rounded-2xl border border-slate-200 bg-white/70 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
    <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
      <div>
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('checks.dueSoon') }}</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('checks.dueDescription') }}</p>
      </div>
      <UButton color="gray" variant="soft" to="/calendar">{{ $t('checks.viewCalendar') }}</UButton>
    </header>
    <UTable :rows="rows" :columns="columns">
      <template #status-data="{ row }">
        <VehicleStatusBadge :status="row.status" />
      </template>
      <template #dueDate-data="{ row }">
        <span class="text-sm text-slate-600 dark:text-slate-300">{{ formatDate(row.dueDate) }}</span>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { DueCheckRow } from '~/types/checks'

interface Props {
  rows: DueCheckRow[]
}

const props = defineProps<Props>()

const columns = [
  { key: 'vehicle', label: 'Vehicle' },
  { key: 'checkType', label: 'Check' },
  { key: 'status', label: 'Status' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'dueKm', label: 'Due Km' }
]

const formatDate = (value?: string) => {
  if (!value) return '—'
  return format(new Date(value), 'PP')
}
</script>
