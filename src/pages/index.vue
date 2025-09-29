<template>
  <div class="space-y-6">
    <DashboardSummary :metrics="metrics" />
    <DashboardAlerts :alerts="alerts" />
    <DashboardVehicles :vehicles="vehicles" />
  </div>
</template>

<script setup lang="ts">
const { dashboard } = storeToRefs(useDashboardStore())
const metrics = computed(() => dashboard.value.metrics)
const alerts = computed(() => dashboard.value.alerts)
const vehicles = computed(() => dashboard.value.vehicles)

onMounted(() => {
  useDashboardStore().fetchDashboard()
})
</script>
