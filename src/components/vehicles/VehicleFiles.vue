<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('files.title') }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('files.description') }}</p>
        </div>
        <UButton icon="i-mdi-upload" @click="triggerUpload">{{ $t('files.upload') }}</UButton>
        <input ref="fileInput" type="file" class="hidden" multiple @change="handleFiles" />
      </div>
    </template>
    <UTable :rows="files" :columns="columns">
      <template #name-data="{ row }">
        <div>
          <p class="text-sm font-medium text-slate-900 dark:text-white">{{ row.name }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ row.type }}</p>
        </div>
      </template>
      <template #size-data="{ row }">
        {{ formatSize(row.size) }}
      </template>
      <template #actions-data="{ row }">
        <div class="flex items-center gap-2">
          <UButton icon="i-mdi-download" size="xs" color="gray" variant="ghost" @click="download(row.id)" />
          <UButton icon="i-mdi-delete" size="xs" color="rose" variant="ghost" @click="remove(row.id)" />
        </div>
      </template>
    </UTable>
  </UCard>
</template>

<script setup lang="ts">
import type { VehicleFile } from '~/types/vehicles'

interface Props {
  vehicleId: string
  files: VehicleFile[]
}

const props = defineProps<Props>()
const fileInput = ref<HTMLInputElement | null>(null)
const checkStore = useCheckStore()

const columns = [
  { key: 'name', label: 'File' },
  { key: 'uploadedBy', label: 'Uploaded By' },
  { key: 'uploadedAt', label: 'Uploaded At' },
  { key: 'size', label: 'Size' },
  { key: 'actions', label: '', sortable: false }
]

const triggerUpload = () => fileInput.value?.click()

const handleFiles = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return
  await checkStore.uploadFiles(props.vehicleId, Array.from(target.files))
  target.value = ''
}

const download = (id: string) => checkStore.downloadFile(id)
const remove = (id: string) => checkStore.deleteFile(id)

const formatSize = (size: number) => `${(size / 1024).toFixed(1)} KB`
</script>
