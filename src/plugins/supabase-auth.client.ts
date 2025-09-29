export default defineNuxtPlugin(() => {
  const client = useSupabaseClient()
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
