<template>
  <div class="space-y-6">
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ $t('reports.title') }}</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('reports.subtitle') }}</p>
      </div>
      <UButton icon="i-lucide-file-chart-line" @click="generate">{{ $t('reports.generate') }}</UButton>
    </div>

    <ReportBuilder :config="config" @update:config="updateConfig" />
    <ReportHistory :items="history" />
  </div>
</template>

<script setup lang="ts">
const reportStore = useReportStore()
const { config, history } = storeToRefs(reportStore)

const updateConfig = (value: typeof config.value) => reportStore.setConfig(value)
const generate = () => reportStore.generate()
</script>
