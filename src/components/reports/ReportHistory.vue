<template>
  <UCard>
    <template #header>
      <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('reports.history') }}</h3>
    </template>
    <UTable :rows="items" :columns="columns">
      <template #actions-data="{ row }">
        <div class="flex items-center gap-2">
          <UButton icon="i-lucide-download" size="xs" color="gray" variant="ghost" @click="$emit('download', row.id)" />
          <UButton icon="i-lucide-trash-2" size="xs" color="rose" variant="ghost" @click="$emit('delete', row.id)" />
        </div>
      </template>
    </UTable>
  </UCard>
</template>

<script setup lang="ts">
import type { ReportHistoryItem } from '~/stores/reports'

interface Props {
  items: ReportHistoryItem[]
}

const props = defineProps<Props>()

defineEmits<{ download: [string]; delete: [string] }>()

const columns = [
  { key: 'name', label: 'Report' },
  { key: 'createdAt', label: 'Generated At' },
  { key: 'format', label: 'Format' },
  { key: 'actions', label: '', sortable: false }
]
</script>
