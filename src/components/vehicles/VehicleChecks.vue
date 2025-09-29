<template>
  <div class="space-y-4">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('checks.activePlans') }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('checks.planDescription') }}</p>
          </div>
          <UButton color="gray" variant="soft" icon="i-mdi-plus" @click="openPlanForm">{{ $t('checks.addPlan') }}</UButton>
        </div>
      </template>
      <UTable :rows="plans" :columns="planColumns">
        <template #status-data="{ row }">
          <VehicleStatusBadge :status="row.status" />
        </template>
        <template #frequency-data="{ row }">
          <div class="text-xs text-slate-500 dark:text-slate-400">
            <p>{{ row.frequencyDays }} {{ $t('checks.days') }}</p>
            <p v-if="row.frequencyKm">{{ row.frequencyKm }} km</p>
          </div>
        </template>
      </UTable>
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('checks.logs') }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('checks.logDescription') }}</p>
          </div>
          <UButton icon="i-mdi-clipboard-plus" @click="openLogForm">{{ $t('checks.logCheck') }}</UButton>
        </div>
      </template>
      <UTimeline :items="timeline">
        <template #default="{ item }">
          <div class="rounded-lg border border-slate-200 bg-white/60 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ item.title }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.description }}</p>
              </div>
              <VehicleStatusBadge :status="item.status" />
            </div>
            <div class="mt-2 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>{{ $t('checks.performedAt') }} {{ formatDate(item.performedAt) }}</span>
              <span>{{ $t('vehicles.odometer') }} {{ item.odometer?.toLocaleString() }} km</span>
            </div>
          </div>
        </template>
      </UTimeline>
    </UCard>

    <CheckPlanForm v-model="showPlanForm" :vehicle-id="vehicleId" @saved="handleSaved" />
    <CheckLogForm v-model="showLogForm" :vehicle-id="vehicleId" :plans="plans" @saved="handleSaved" />
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { CheckLog, CheckPlan } from '~/types/checks'

interface Props {
  vehicleId: string
  plans: CheckPlan[]
  logs: CheckLog[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ refresh: [] }>()

const showPlanForm = ref(false)
const showLogForm = ref(false)

const planColumns = [
  { key: 'name', label: 'Check' },
  { key: 'status', label: 'Status' },
  { key: 'frequency', label: 'Frequency' },
  { key: 'nextDueDate', label: 'Next Due' }
]

const timeline = computed(() =>
  props.logs.map((log) => ({
    id: log.id,
    title: log.checkName,
    description: log.notes ?? '',
    status: log.status,
    performedAt: log.performedAt,
    odometer: log.odometer
  }))
)

const formatDate = (value?: string) => {
  if (!value) return '—'
  return format(new Date(value), 'PP')
}

const openPlanForm = () => (showPlanForm.value = true)
const openLogForm = () => (showLogForm.value = true)
const handleSaved = () => emit('refresh')
</script>
