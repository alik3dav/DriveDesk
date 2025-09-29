<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ $t('settings.profile') }}</h2>
    </template>
    <UForm :state="form" class="grid gap-4 md:grid-cols-2" @submit.prevent="save">
      <UFormGroup :label="$t('settings.fullName')">
        <UInput v-model="form.fullName" />
      </UFormGroup>
      <UFormGroup :label="$t('settings.email')">
        <UInput v-model="form.email" type="email" disabled />
      </UFormGroup>
      <UFormGroup :label="$t('settings.role')">
        <UInput v-model="form.role" disabled />
      </UFormGroup>
      <UFormGroup :label="$t('settings.phone')">
        <UInput v-model="form.phone" />
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
const form = reactive({
  fullName: '',
  email: '',
  role: '',
  phone: ''
})

watch(
  profile,
  (value) => {
    form.fullName = value?.fullName ?? ''
    form.email = value?.email ?? ''
    form.role = value?.role ?? ''
    form.phone = value?.phone ?? ''
  },
  { immediate: true }
)

const save = async () => {
  if (!profile.value) return
  saving.value = true
  try {
    await userStore.updateProfile({
      fullName: form.fullName,
      phone: form.phone || null
    })
  } finally {
    saving.value = false
  }
}
</script>
