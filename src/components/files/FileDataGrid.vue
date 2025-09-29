<template>
  <div class="rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
    <UTable :rows="files" :columns="columns" class="bg-white/70 dark:bg-slate-900/60">
      <template #name-data="{ row }">
        <div>
          <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ row.name }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ row.vehicle }}</p>
        </div>
      </template>
      <template #size-data="{ row }">{{ formatSize(row.size) }}</template>
      <template #actions-data="{ row }">
        <div class="flex items-center gap-2">
          <UButton icon="i-lucide-download" size="xs" color="gray" variant="ghost" @click="download(row.id)" />
          <UButton icon="i-lucide-trash-2" size="xs" color="rose" variant="ghost" @click="remove(row.id)" />
        </div>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import type { VehicleFile } from '~/types/vehicles'

interface Props {
  files: VehicleFile[]
}

const props = defineProps<Props>()
const fileStore = useFileStore()

const columns = [
  { key: 'name', label: 'File' },
  { key: 'type', label: 'Type' },
  { key: 'uploadedBy', label: 'Uploaded By' },
  { key: 'uploadedAt', label: 'Uploaded At' },
  { key: 'size', label: 'Size' },
  { key: 'actions', label: '', sortable: false }
]

const download = (id: string) => fileStore.download(id)
const remove = (id: string) => fileStore.remove(id)
const formatSize = (size: number) => `${(size / 1024).toFixed(1)} KB`
</script>
