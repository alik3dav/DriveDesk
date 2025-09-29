<template>
  <UCard>
    <template #header>
      <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('reports.builder') }}</h3>
    </template>
    <div class="grid gap-4 md:grid-cols-2">
      <UFormGroup :label="$t('reports.dateRange')">
        <div class="flex gap-2">
          <UInput v-model="local.start" type="date" />
          <UInput v-model="local.end" type="date" />
        </div>
      </UFormGroup>
      <UFormGroup :label="$t('reports.include')">
        <UCheckboxGroup v-model="local.sections" :options="sectionOptions" />
      </UFormGroup>
      <UFormGroup :label="$t('reports.format')">
        <USelect v-model="local.format" :options="formats" />
      </UFormGroup>
      <UFormGroup :label="$t('reports.groupBy')">
        <USelect v-model="local.groupBy" :options="groupOptions" />
      </UFormGroup>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { ReportConfig } from '~/stores/reports'

interface Props {
  config: ReportConfig
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:config': [ReportConfig] }>()

const local = reactive<ReportConfig>({ ...props.config })

watch(
  () => props.config,
  (value) => Object.assign(local, value),
  { deep: true }
)

watch(
  () => local,
  (value) => emit('update:config', { ...value }),
  { deep: true }
)

const sectionOptions = [
  { label: 'Vehicles', value: 'vehicles' },
  { label: 'Checks', value: 'checks' },
  { label: 'Costs', value: 'costs' }
]

const formats = [
  { label: 'PDF', value: 'pdf' },
  { label: 'CSV', value: 'csv' }
]

const groupOptions = [
  { label: 'Vehicle', value: 'vehicle' },
  { label: 'Check Type', value: 'checkType' },
  { label: 'Status', value: 'status' }
]
</script>
