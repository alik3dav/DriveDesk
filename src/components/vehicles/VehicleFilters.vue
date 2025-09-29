<template>
  <div class="grid gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 md:grid-cols-4">
    <UFormGroup :label="$t('vehicles.status')">
      <USelect v-model="localFilters.status" :options="statusOptions" option-attribute="label" value-attribute="value" />
    </UFormGroup>
    <UFormGroup :label="$t('vehicles.make')">
      <UInput v-model="localFilters.make" placeholder="Tesla" />
    </UFormGroup>
    <UFormGroup :label="$t('vehicles.model')">
      <UInput v-model="localFilters.model" placeholder="Model 3" />
    </UFormGroup>
    <UFormGroup :label="$t('vehicles.year')">
      <UInput v-model="localFilters.year" type="number" min="1980" max="2050" />
    </UFormGroup>
    <div class="md:col-span-4 flex justify-end gap-2">
      <UButton color="gray" variant="ghost" @click="resetFilters">{{ $t('common.reset') }}</UButton>
      <UButton color="gray" variant="soft" @click="apply">{{ $t('common.apply') }}</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VehicleFilterState } from '~/stores/vehicle'

interface Props {
  filters: VehicleFilterState
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:filters': [VehicleFilterState] }>()

const { t } = useI18n()
const statusOptions = computed(() => [
  { label: t('status.all'), value: 'all' },
  { label: t('status.ok'), value: 'ok' },
  { label: t('status.due-soon'), value: 'due-soon' },
  { label: t('status.overdue'), value: 'overdue' }
])

const localFilters = reactive<VehicleFilterState>({ ...props.filters })

watch(
  () => props.filters,
  (value) => {
    Object.assign(localFilters, value)
  },
  { deep: true }
)

const apply = () => {
  emit('update:filters', { ...localFilters })
}

const resetFilters = () => {
  emit('update:filters', {
    status: 'all',
    make: '',
    model: '',
    year: ''
  })
}
</script>
