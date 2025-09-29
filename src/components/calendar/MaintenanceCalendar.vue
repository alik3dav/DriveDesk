<template>
  <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
    <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="event in events"
        :key="event.id"
        class="rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-slate-700 dark:bg-slate-900/40"
      >
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ event.title }}</p>
          <VehicleStatusBadge :status="event.status" />
        </div>
        <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">{{ event.vehicle }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">{{ formatDate(event.date) }}</p>
      </div>
    </div>
    <p v-if="!events.length" class="py-8 text-center text-sm text-slate-500 dark:text-slate-400">{{ $t('calendar.noEvents') }}</p>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { CalendarEvent } from '~/types/calendar'

interface Props {
  events: CalendarEvent[]
  view: 'month' | 'week'
  dateRange: { start: Date; end: Date }
}

const props = defineProps<Props>()

const formatDate = (date: string) => format(new Date(date), 'PP')
</script>
