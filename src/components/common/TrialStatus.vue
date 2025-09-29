<template>
  <div class="space-y-3 text-sm">
    <div class="flex items-center gap-3">
      <Icon :name="icon" :class="['h-6 w-6', iconColor]" />
      <div>
        <p class="font-semibold text-slate-900 dark:text-white">{{ headline }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">{{ subline }}</p>
      </div>
    </div>
    <UProgress :value="progress" color="brand" />
    <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400">
      <span>{{ $t('subscription.started') }} {{ formatDate(trial.startedAt) }}</span>
      <span>{{ $t('subscription.ends') }} {{ formatDate(trial.endsAt) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { TrialInfo } from '~/types/subscriptions'

interface Props {
  trial: TrialInfo
}

const props = defineProps<Props>()

const headline = computed(() => {
  if (props.trial.status === 'active') return useI18n().t('subscription.trialActive')
  if (props.trial.status === 'expiring-soon') return useI18n().t('subscription.trialEndingSoon')
  return useI18n().t('subscription.trialExpired')
})

const subline = computed(() => props.trial.message)

const progress = computed(() => props.trial.progress)

const icon = computed(() => {
  switch (props.trial.status) {
    case 'active':
      return 'mdi:progress-clock'
    case 'expiring-soon':
      return 'mdi:clock-alert'
    default:
      return 'mdi:alert-octagon'
  }
})

const iconColor = computed(() => {
  switch (props.trial.status) {
    case 'active':
      return 'text-emerald-500'
    case 'expiring-soon':
      return 'text-amber-500'
    default:
      return 'text-rose-500'
  }
})

const formatDate = (value?: string | Date) => {
  if (!value) return '—'
  return format(new Date(value), 'PP')
}
</script>
