<template>
  <USlideover v-model="internalOpen">
    <UCard class="flex h-full flex-col">
      <template #header>
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ title }}</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('vehicles.formDescription') }}</p>
        </div>
      </template>

      <UForm :state="form" class="grid flex-1 grid-cols-1 gap-4 overflow-y-auto pb-6 md:grid-cols-2" @submit.prevent="submit">
        <UFormGroup :label="$t('vehicles.plate')" name="plate">
          <UInput v-model="form.plate" required />
        </UFormGroup>
        <UFormGroup :label="$t('vehicles.make')" name="make">
          <UInput v-model="form.make" required />
        </UFormGroup>
        <UFormGroup :label="$t('vehicles.model')" name="model">
          <UInput v-model="form.model" required />
        </UFormGroup>
        <UFormGroup :label="$t('vehicles.year')" name="year">
          <UInput v-model="form.year" type="number" min="1980" max="2050" required />
        </UFormGroup>
        <UFormGroup :label="$t('vehicles.vin')" name="vin">
          <UInput v-model="form.vin" required />
        </UFormGroup>
        <UFormGroup :label="$t('vehicles.odometer')" name="odometer">
          <UInput v-model="form.odometer" type="number" min="0" required />
        </UFormGroup>
        <UFormGroup :label="$t('vehicles.status')" name="status">
          <USelect v-model="form.status" :options="statusOptions" option-attribute="label" value-attribute="value" />
        </UFormGroup>
        <UFormGroup :label="$t('vehicles.notes')" name="notes" class="md:col-span-2">
          <UTextarea v-model="form.notes" :rows="4" />
        </UFormGroup>
      </UForm>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="gray" variant="ghost" @click="close">{{ $t('common.cancel') }}</UButton>
          <UButton :loading="saving" @click="submit">{{ $t('common.save') }}</UButton>
        </div>
      </template>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
import type { VehicleFormState } from '~/types/vehicles'

interface Props {
  open: boolean
  vehicle?: VehicleFormState | null
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:open': [boolean]; saved: [] }>()

const internalOpen = computed({
  get: () => props.open,
  set: (value: boolean) => emit('update:open', value)
})

const { t } = useI18n()
const vehicleStore = useVehicleStore()
const saving = ref(false)

const form = reactive<VehicleFormState>({
  id: undefined,
  plate: '',
  make: '',
  model: '',
  year: new Date().getFullYear(),
  vin: '',
  odometer: 0,
  status: 'ok',
  notes: ''
})

const statusOptions = computed(() => [
  { label: t('status.ok'), value: 'ok' },
  { label: t('status.due-soon'), value: 'due-soon' },
  { label: t('status.overdue'), value: 'overdue' }
])

watch(
  () => props.vehicle,
  (value) => {
    if (value) {
      Object.assign(form, value)
    } else {
      reset()
    }
  },
  { immediate: true }
)

const title = computed(() => (form.id ? t('vehicles.editVehicle') : t('vehicles.addVehicle')))

const submit = async () => {
  saving.value = true
  try {
    await vehicleStore.saveVehicle({ ...form })
    emit('saved')
    close()
  } finally {
    saving.value = false
  }
}

const close = () => {
  internalOpen.value = false
  nextTick(() => reset())
}

const reset = () => {
  Object.assign(form, {
    id: undefined,
    plate: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    vin: '',
    odometer: 0,
    status: 'ok',
    notes: ''
  })
}
</script>
