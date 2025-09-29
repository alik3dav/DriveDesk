<template>
  <UModal v-model="open">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ $t('checks.logCheck') }}</h3>
      </template>
      <UForm class="space-y-4" @submit.prevent="submit">
        <UFormGroup :label="$t('checks.plan')">
          <USelect v-model="form.checkPlanId" :options="planOptions" option-attribute="label" value-attribute="value" />
        </UFormGroup>
        <UFormGroup :label="$t('checks.performedAt')">
          <UInput v-model="form.performedAt" type="date" required />
        </UFormGroup>
        <UFormGroup :label="$t('vehicles.odometer')">
          <UInput v-model="form.odometer" type="number" min="0" required />
        </UFormGroup>
        <UFormGroup :label="$t('common.notes')">
          <UTextarea v-model="form.notes" :rows="3" />
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
import type { CheckPlan } from '~/types/checks'

interface Props {
  modelValue: boolean
  vehicleId: string
  plans: CheckPlan[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [boolean]; saved: [] }>()

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const checkStore = useCheckStore()
const saving = ref(false)

const form = reactive({
  checkPlanId: '',
  performedAt: new Date().toISOString().slice(0, 10),
  odometer: 0,
  notes: ''
})

const planOptions = computed(() =>
  props.plans.map((plan) => ({ label: plan.name, value: plan.id }))
)

const submit = async () => {
  saving.value = true
  try {
    await checkStore.createLog({ ...form, vehicleId: props.vehicleId })
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
