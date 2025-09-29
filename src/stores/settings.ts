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
  const rpc = <Fn extends Extract<keyof Database['public']['Functions'], string>>(
    fn: Fn,
    args: Database['public']['Functions'][Fn]['Args']
  ) => client.rpc(fn, args as never)

  const saveNotificationSettings = async () => {
    await rpc('save_notification_settings', { settings: notificationSettings.value })
  }

  return { notificationSettings, saveNotificationSettings }
})
