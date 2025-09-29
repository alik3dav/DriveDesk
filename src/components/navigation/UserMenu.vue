<template>
  <UPopover>
    <UButton color="gray" variant="soft" size="sm">
      <div class="flex items-center gap-2">
        <UAvatar :text="initials" size="xs" />
        <span class="hidden text-sm font-medium text-slate-700 dark:text-slate-200 md:inline">{{ profile?.fullName }}</span>
      </div>
    </UButton>
    <template #panel>
      <div class="w-56 p-2 text-sm">
        <p class="px-2 py-1 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ profile?.role }}</p>
        <NuxtLink
          to="/settings/profile"
          class="flex w-full items-center gap-2 rounded px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Icon name="lucide:user-cog" class="h-4 w-4" />
          {{ $t('navigation.profile') }}
        </NuxtLink>
        <button class="flex w-full items-center gap-2 rounded px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" @click="signOut">
          <Icon name="lucide:log-out" class="h-4 w-4" />
          {{ $t('auth.signOut') }}
        </button>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const authStore = useAuthStore()
const profile = computed(() => userStore.profile)
const initials = computed(() => profile.value?.fullName?.split(' ').map((n) => n[0]).join('').slice(0, 2) ?? 'DD')

const signOut = async () => {
  await authStore.signOut()
  await navigateTo('/auth/login')
}
</script>
