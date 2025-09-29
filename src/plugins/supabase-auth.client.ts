import type { Database } from '~/types/supabase'

export default defineNuxtPlugin(() => {
  const client = useSupabaseClient<Database>()
  const userStore = useUserStore()

  client.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      await userStore.bootstrap()
    }
    if (event === 'SIGNED_OUT') {
      userStore.setProfile(null)
    }
  })
})
