import { defineStore } from 'pinia'
import type { UserProfile } from '~/types/auth'

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile | null>(null)
  const profileLoaded = ref(false)
  const subscriptionLocked = computed(() => profile.value?.subscriptionStatus === 'locked')

  const client = useSupabaseClient()

  const bootstrap = async () => {
    const { data } = await client.rpc('get_active_profile')
    profile.value = data as UserProfile
    profileLoaded.value = true
  }

  const updateProfile = async () => {
    if (!profile.value) return
    await client.from('profiles').update({
      full_name: profile.value.fullName,
      phone: profile.value.phone
    }).eq('id', profile.value.id)
  }

  const setProfile = (value: UserProfile | null) => {
    profile.value = value
  }

  return { profile, profileLoaded, subscriptionLocked, bootstrap, updateProfile, setProfile }
})
