<template>
  <div class="space-y-6">
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ $t('vehicles.title') }}</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('vehicles.subtitle') }}</p>
      </div>
      <div class="flex gap-2">
        <UButton color="gray" variant="soft" icon="i-mdi-tray-arrow-down" @click="exportFleet">{{ $t('common.export') }}</UButton>
        <UButton icon="i-mdi-plus" @click="openVehicleForm">{{ $t('vehicles.addVehicle') }}</UButton>
      </div>
    </div>

    <VehicleFilters :filters="filters" @update:filters="updateFilters" />
    <VehicleDataGrid :vehicles="filteredVehicles" @select="goToVehicle" />
    <VehicleFormDrawer v-model:open="showVehicleForm" @saved="reload" />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const vehicleStore = useVehicleStore()
const { filters } = storeToRefs(vehicleStore)
const showVehicleForm = ref(false)

onMounted(() => {
  vehicleStore.fetchVehicles()
})

const filteredVehicles = computed(() => vehicleStore.filteredVehicles)

const updateFilters = (value: typeof filters.value) => {
  vehicleStore.setFilters(value)
}

const goToVehicle = (id: string) => {
  router.push(`/vehicles/${id}`)
}

const openVehicleForm = () => {
  showVehicleForm.value = true
}

const reload = () => {
  vehicleStore.fetchVehicles()
}

const exportFleet = () => {
  vehicleStore.exportFleet()
}
</script>
