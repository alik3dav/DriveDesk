<template>
  <UModal v-model="open">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ $t('checks.addPlan') }}</h3>
      </template>
      <UForm :state="form" class="space-y-4" @submit.prevent="submit">
        <UFormGroup v-if="!props.vehicleId" :label="$t('vehicles.title')">
          <USelect v-model="form.vehicleId" :options="vehicleOptions" option-attribute="label" value-attribute="value" />
        </UFormGroup>
        <UFormGroup :label="$t('checks.type')">
          <USelect v-model="form.checkTypeId" :options="checkTypeOptions" option-attribute="label" value-attribute="value" />
        </UFormGroup>
        <UFormGroup :label="$t('checks.frequencyDays')">
          <UInput v-model="form.frequencyDays" type="number" min="0" required />
        </UFormGroup>
        <UFormGroup :label="$t('checks.frequencyKm')">
          <UInput v-model="form.frequencyKm" type="number" min="0" />
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
import type { CheckTypeOption } from '~/types/checks'

interface Props {
  modelValue: boolean
  vehicleId?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [boolean]; saved: [] }>()

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const { t } = useI18n()
const checkStore = useCheckStore()
const vehicleStore = useVehicleStore()
const saving = ref(false)

const form = reactive({
  vehicleId: props.vehicleId ?? '',
  checkTypeId: '',
  frequencyDays: 180,
  frequencyKm: 10000
})

const checkTypeOptions = computed<CheckTypeOption[]>(() => checkStore.options)
const vehicleOptions = computed(() =>
  vehicleStore.vehicles.map((vehicle) => ({
    label: `${vehicle.plate} · ${vehicle.make} ${vehicle.model}`,
    value: vehicle.id
  }))
)

watchEffect(() => {
  if (open.value) {
    checkStore.fetchCheckTypes()
    if (!vehicleStore.vehicles.length) {
      vehicleStore.fetchVehicles()
    }
  }
})

watch(
  () => props.vehicleId,
  (value) => {
    if (value) {
      form.vehicleId = value
    }
  }
)

const submit = async () => {
  saving.value = true
  try {
    await checkStore.createPlan({ ...form, vehicleId: form.vehicleId || props.vehicleId })
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
