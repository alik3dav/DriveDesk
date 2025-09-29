import { defineStore } from 'pinia'
import type { UserProfile } from '~/types/auth'
import type { Database } from '~/types/supabase'

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile | null>(null)
  const profileLoaded = ref(false)
  const subscriptionLocked = computed(() => profile.value?.subscriptionStatus === 'locked')

  const client = useSupabaseClient<Database>()

  const bootstrap = async () => {
    const { data } = await client.rpc('get_active_profile')
    profile.value = data ? (data as UserProfile) : null
    profileLoaded.value = true
  }

  const updateProfile = async (payload: { fullName: string; phone: string | null }) => {
    if (!profile.value) return
    await (client.from('profiles') as any).update({
      full_name: payload.fullName,
      phone: payload.phone
    }).eq('id', profile.value.id)
    profile.value = { ...profile.value, fullName: payload.fullName, phone: payload.phone }
  }

  const setProfile = (value: UserProfile | null) => {
    profile.value = value
  }

  return { profile, profileLoaded, subscriptionLocked, bootstrap, updateProfile, setProfile }
})
