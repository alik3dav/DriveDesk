<template>
  <div class="grid gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 md:grid-cols-3">
    <UFormGroup :label="$t('files.vehicle')">
      <UInput v-model="local.vehicle" />
    </UFormGroup>
    <UFormGroup :label="$t('files.type')">
      <UInput v-model="local.type" />
    </UFormGroup>
    <UFormGroup :label="$t('files.uploadedBy')">
      <UInput v-model="local.uploadedBy" />
    </UFormGroup>
    <div class="md:col-span-3 flex justify-end gap-2">
      <UButton color="gray" variant="ghost" @click="reset">{{ $t('common.reset') }}</UButton>
      <UButton color="gray" variant="soft" @click="apply">{{ $t('common.apply') }}</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileFilterState } from '~/stores/files'

interface Props {
  filters: FileFilterState
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:filters': [FileFilterState] }>()

const local = reactive<FileFilterState>({ ...props.filters })

watch(
  () => props.filters,
  (value) => Object.assign(local, value),
  { deep: true }
)

const apply = () => emit('update:filters', { ...local })
const reset = () => emit('update:filters', { vehicle: '', type: '', uploadedBy: '' })
</script>
