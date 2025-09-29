<template>
  <div class="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
    <div class="flex items-center gap-2">
      <UButton color="gray" variant="ghost" icon="i-lucide-chevron-left" @click="previous" />
      <UButton color="gray" variant="ghost" icon="i-lucide-chevron-right" @click="next" />
      <UButton color="gray" variant="soft" @click="today">{{ $t('calendar.today') }}</UButton>
    </div>
    <div class="flex items-center gap-2">
      <UBadge color="gray">{{ formattedRange }}</UBadge>
      <UButtonGroup size="sm">
        <UButton :color="view === 'month' ? 'primary' : 'gray'" @click="changeView('month')">{{ $t('calendar.month') }}</UButton>
        <UButton :color="view === 'week' ? 'primary' : 'gray'" @click="changeView('week')">{{ $t('calendar.week') }}</UButton>
      </UButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

interface Props {
  view: 'month' | 'week'
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'change:view': ['month' | 'week']; 'change:range': [{ start: Date; end: Date }] }>()

const current = ref(new Date())
const { view } = toRefs(props)

const formattedRange = computed(() => format(current.value, view.value === 'month' ? 'LLLL yyyy' : 'wo MMM yyyy'))

const changeView = (newView: 'month' | 'week') => {
  emit('change:view', newView)
  emit('change:range', calculateRange(current.value, newView))
}

const previous = () => {
  current.value = adjustDate(-1)
  emit('change:range', calculateRange(current.value, view.value))
}

const next = () => {
  current.value = adjustDate(1)
  emit('change:range', calculateRange(current.value, view.value))
}

const today = () => {
  current.value = new Date()
  emit('change:range', calculateRange(current.value, view.value))
}

const adjustDate = (direction: 1 | -1) => {
  const updated = new Date(current.value)
  if (view.value === 'month') {
    updated.setMonth(updated.getMonth() + direction)
  } else {
    updated.setDate(updated.getDate() + direction * 7)
  }
  return updated
}

const calculateRange = (date: Date, currentView: 'month' | 'week') => {
  if (currentView === 'month') {
    const start = new Date(date.getFullYear(), date.getMonth(), 1)
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return { start, end }
  }
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  const start = new Date(date.setDate(diff))
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start, end }
}
</script>
