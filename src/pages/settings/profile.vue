<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ $t('settings.profile') }}</h2>
    </template>
    <UForm class="grid gap-4 md:grid-cols-2" @submit.prevent="save">
      <UFormGroup :label="$t('settings.fullName')">
        <UInput v-model="profile.fullName" />
      </UFormGroup>
      <UFormGroup :label="$t('settings.email')">
        <UInput v-model="profile.email" type="email" disabled />
      </UFormGroup>
      <UFormGroup :label="$t('settings.role')">
        <UInput v-model="profile.role" disabled />
      </UFormGroup>
      <UFormGroup :label="$t('settings.phone')">
        <UInput v-model="profile.phone" />
      </UFormGroup>
      <div class="md:col-span-2 flex justify-end">
        <UButton :loading="saving" type="submit">{{ $t('common.save') }}</UButton>
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { profile } = storeToRefs(userStore)
const saving = ref(false)

const save = async () => {
  saving.value = true
  try {
    await userStore.updateProfile()
  } finally {
    saving.value = false
  }
}
</script>
