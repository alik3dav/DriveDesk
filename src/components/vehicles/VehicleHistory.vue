<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ $t('vehicles.history') }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('vehicles.historyDescription') }}</p>
        </div>
        <UButton color="gray" variant="soft" icon="i-lucide-download" @click="$emit('export')">
          {{ $t('common.export') }}
        </UButton>
      </div>
    </template>
    <UTimeline :items="items">
      <template #default="{ item }">
        <div class="rounded-lg border border-slate-200 bg-white/60 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
          <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ item.title }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.description }}</p>
        </div>
      </template>
    </UTimeline>
  </UCard>
</template>

<script setup lang="ts">
import type { VehicleHistoryItem } from '~/types/vehicles'

interface Props {
  history: VehicleHistoryItem[]
}

const props = defineProps<Props>()

defineEmits<{ export: [] }>()

const items = computed(() =>
  props.history.map((item) => ({
    id: item.id,
    title: item.title,
    description: `${item.date} · ${item.description}`
  }))
)
</script>
