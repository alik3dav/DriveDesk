<template>
  <div class="grid gap-4 md:grid-cols-4">
    <div
      v-for="item in summary"
      :key="item.status"
      class="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
    >
      <p class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ $t(`status.${item.status}`) }}</p>
      <p class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{{ item.count }}</p>
      <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckSummaryItem } from '~/types/checks'

interface Props {
  summary: CheckSummaryItem[]
}

const props = defineProps<Props>()
</script>
