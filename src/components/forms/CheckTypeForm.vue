<template>
  <UModal v-model="open">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ title }}</h3>
      </template>
      <UForm :state="form" class="space-y-4" @submit.prevent="submit">
        <UFormGroup :label="$t('checks.name')">
          <UInput v-model="form.name" required />
        </UFormGroup>
        <UFormGroup :label="$t('checks.description')">
          <UTextarea v-model="form.description" :rows="3" />
        </UFormGroup>
        <UFormGroup :label="$t('checks.frequencyDays')">
          <UInput v-model="form.defaultFrequencyDays" type="number" min="0" />
        </UFormGroup>
        <UFormGroup :label="$t('checks.frequencyKm')">
          <UInput v-model="form.defaultFrequencyKm" type="number" min="0" />
        </UFormGroup>
      </UForm>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="gray" variant="ghost" @click="close">{{ $t('common.cancel') }}</UButton>
          <UButton :loading="saving" @click="submit">{{ $t('common.save') }}</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { CheckType } from '~/types/checks'

interface Props {
  modelValue: boolean
  checkType: CheckType | null
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [boolean]; saved: [] }>()
const checkStore = useCheckStore()

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const form = reactive({
  id: '',
  name: '',
  description: '',
  defaultFrequencyDays: 0,
  defaultFrequencyKm: 0
})

const saving = ref(false)
const title = computed(() => (form.id ? useI18n().t('checks.editType') : useI18n().t('checks.addType')))

watch(
  () => props.checkType,
  (value) => {
    if (value) {
      Object.assign(form, value)
    } else {
      Object.assign(form, {
        id: '',
        name: '',
        description: '',
        defaultFrequencyDays: 0,
        defaultFrequencyKm: 0
      })
    }
  },
  { immediate: true }
)

const submit = async () => {
  saving.value = true
  try {
    await checkStore.saveCheckType({ ...form })
    emit('saved')
    close()
  } finally {
    saving.value = false
  }
}

const close = () => {
  open.value = false
}
</script>
