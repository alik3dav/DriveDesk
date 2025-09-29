export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.startsWith('/auth')) return

  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo('/auth/login')
  }

  const userStore = useUserStore()
  if (!userStore.profileLoaded) {
    await userStore.bootstrap()
  }

  if (userStore.subscriptionLocked && to.path !== '/settings/subscription') {
    return navigateTo('/settings/subscription')
  }
})
