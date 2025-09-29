<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ $t('calendar.title') }}</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('calendar.subtitle') }}</p>
    </div>
    <CalendarToolbar :view="view" @change:view="updateView" @change:range="updateRange" />
    <MaintenanceCalendar :events="events" :view="view" :date-range="range" />
  </div>
</template>

<script setup lang="ts">
const view = ref<'month' | 'week'>('month')
const range = ref(getRange(new Date(), view.value))
const calendarStore = useCalendarStore()
const events = computed(() => calendarStore.events)

onMounted(() => {
  calendarStore.fetchEvents(range.value)
})

const updateView = (value: 'month' | 'week') => {
  view.value = value
}

const updateRange = (value: { start: Date; end: Date }) => {
  range.value = value
  calendarStore.fetchEvents(value)
}

function getRange(date: Date, currentView: 'month' | 'week') {
  if (currentView === 'month') {
    return {
      start: new Date(date.getFullYear(), date.getMonth(), 1),
      end: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    }
  }
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  const start = new Date(date.getFullYear(), date.getMonth(), diff)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start, end }
}
</script>
