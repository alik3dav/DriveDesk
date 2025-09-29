<template>
  <span :class="classes" class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold">
    <span class="h-2 w-2 rounded-full" :class="dotClass"></span>
    {{ $t(`status.${status}`) }}
  </span>
</template>

<script setup lang="ts">
import type { VehicleStatus } from '~/types/vehicles'

interface Props {
  status: VehicleStatus
}

const props = defineProps<Props>()

const classes = computed(() => {
  switch (props.status) {
    case 'ok':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'
    case 'due-soon':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200'
    case 'overdue':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200'
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-200'
  }
})

const dotClass = computed(() => {
  switch (props.status) {
    case 'ok':
      return 'bg-emerald-500'
    case 'due-soon':
      return 'bg-amber-500'
    case 'overdue':
      return 'bg-rose-500'
    default:
      return 'bg-slate-400'
  }
})
</script>
