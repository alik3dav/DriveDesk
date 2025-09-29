<template>
  <div class="space-y-6">
    <VehicleHeader :vehicle="vehicle" @update="refresh" />
    <UTabs v-model="activeTab" :items="tabs" class="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <template #item-overview>
        <VehicleOverview v-if="vehicle" :vehicle="vehicle" />
      </template>
      <template #item-checks>
        <VehicleChecks v-if="vehicle" :plans="plans" :logs="logs" :vehicle-id="vehicle.id" @refresh="refresh" />
      </template>
      <template #item-history>
        <VehicleHistory :history="history" />
      </template>
      <template #item-files>
        <VehicleFiles v-if="vehicle" :files="files" :vehicle-id="vehicle.id" />
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const vehicleStore = useVehicleStore()
const { vehicleDetail } = storeToRefs(vehicleStore)
const vehicleId = computed(() => route.params.id as string)
const activeTab = ref(0)

const tabs = [
  { label: 'Overview', slot: 'overview' },
  { label: 'Checks', slot: 'checks' },
  { label: 'History', slot: 'history' },
  { label: 'Files', slot: 'files' }
]

onMounted(() => {
  refresh()
})

const refresh = () => {
  vehicleStore.fetchVehicleDetail(vehicleId.value)
}

const vehicle = computed(() => vehicleDetail.value.vehicle?.id ? vehicleDetail.value.vehicle : null)
const plans = computed(() => vehicleDetail.value.checkPlans)
const logs = computed(() => vehicleDetail.value.checkLogs)
const history = computed(() => vehicleDetail.value.history)
const files = computed(() => vehicleDetail.value.files)
</script>
