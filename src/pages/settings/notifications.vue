<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ $t('settings.notifications') }}</h2>
    </template>
    <div class="space-y-4">
      <UFormGroup :label="$t('settings.daysBeforeDue')">
        <URange v-model="settings.daysBeforeDue" :min="1" :max="60" />
      </UFormGroup>
      <UFormGroup :label="$t('settings.kmBeforeDue')">
        <URange v-model="settings.kmBeforeDue" :min="100" :max="5000" :step="100" />
      </UFormGroup>
      <UCheckbox v-model="settings.email" :label="$t('settings.emailNotifications')" />
      <UCheckbox v-model="settings.push" :label="$t('settings.pushNotifications')" />
      <div class="flex justify-end">
        <UButton :loading="saving" @click="save">{{ $t('common.save') }}</UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const settingsStore = useSettingsStore()
const { notificationSettings: settings } = storeToRefs(settingsStore)
const saving = ref(false)

const save = async () => {
  saving.value = true
  try {
    await settingsStore.saveNotificationSettings()
  } finally {
    saving.value = false
  }
}
</script>
