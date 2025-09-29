<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ $t('settings.subscription') }}</h2>
    </template>
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('subscription.statusDescription') }}</p>
        <TrialStatus :trial="subscription.trial" />
      </div>
      <div class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
        <h3 class="text-sm font-semibold text-slate-900 dark:text-white">{{ $t('subscription.actions') }}</h3>
        <UButton color="gray" variant="soft" icon="i-mdi-calendar-plus" @click="extendTrial">{{ $t('subscription.extendTrial') }}</UButton>
        <UButton color="emerald" icon="i-mdi-check-decagram" @click="activate">{{ $t('subscription.activate') }}</UButton>
        <p class="text-xs text-slate-500 dark:text-slate-400">{{ $t('subscription.billingNotice') }}</p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const subscriptionStore = useSubscriptionStore()
const { subscription } = storeToRefs(subscriptionStore)

const extendTrial = () => subscriptionStore.extendTrial()
const activate = () => subscriptionStore.activate()
</script>
