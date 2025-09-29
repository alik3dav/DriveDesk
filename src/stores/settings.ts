import { defineStore } from 'pinia'
import type { Database } from '~/types/supabase'

interface NotificationSettings {
  daysBeforeDue: number
  kmBeforeDue: number
  email: boolean
  push: boolean
}

export const useSettingsStore = defineStore('settings', () => {
  const notificationSettings = ref<NotificationSettings>({
    daysBeforeDue: useRuntimeConfig().public.notificationDefaults.daysBeforeDue,
    kmBeforeDue: useRuntimeConfig().public.notificationDefaults.kmBeforeDue,
    email: true,
    push: true
  })
  const client = useSupabaseClient<Database>()

  const saveNotificationSettings = async () => {
    await client.rpc('save_notification_settings', { settings: notificationSettings.value })
  }

  return { notificationSettings, saveNotificationSettings }
})
