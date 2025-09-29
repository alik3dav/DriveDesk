<template>
  <div class="space-y-6">
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ $t('checks.title') }}</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('checks.subtitle') }}</p>
      </div>
      <div class="flex gap-2">
        <UButton color="gray" variant="soft" icon="i-mdi-cog" to="/settings/checks">{{ $t('checks.manageTypes') }}</UButton>
        <UButton icon="i-mdi-plus" @click="openPlanForm">{{ $t('checks.addPlan') }}</UButton>
      </div>
    </div>

    <CheckOverview :summary="summary" />
    <CheckDueTable :rows="dueChecks" />
    <CheckPlanForm v-model="showPlanForm" vehicle-id="" @saved="refresh" />
  </div>
</template>

<script setup lang="ts">
const checkStore = useCheckStore()
const { summary, dueChecks } = storeToRefs(checkStore)
const showPlanForm = ref(false)

onMounted(() => {
  refresh()
})

const refresh = () => {
  checkStore.fetchDueChecks()
  checkStore.fetchSummary()
}

const openPlanForm = () => {
  showPlanForm.value = true
}
</script>
