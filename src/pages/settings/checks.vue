<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ $t('settings.checkTypes') }}</h2>
        <UButton icon="i-lucide-plus" @click="openForm">{{ $t('checks.addType') }}</UButton>
      </div>
    </template>
    <UTable :rows="types" :columns="columns">
      <template #actions-data="{ row }">
        <div class="flex items-center gap-2">
          <UButton icon="i-lucide-pencil" size="xs" color="gray" variant="ghost" @click="edit(row)" />
          <UButton icon="i-lucide-trash-2" size="xs" color="rose" variant="ghost" @click="remove(row.id)" />
        </div>
      </template>
    </UTable>
    <CheckTypeForm v-model="showForm" :check-type="selected" @saved="refresh" />
  </UCard>
</template>

<script setup lang="ts">
import type { CheckType } from '~/types/checks'

const checkStore = useCheckStore()
const { types } = storeToRefs(checkStore)
const showForm = ref(false)
const selected = ref<CheckType | null>(null)

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'defaultFrequencyDays', label: 'Default Days' },
  { key: 'defaultFrequencyKm', label: 'Default Km' },
  { key: 'actions', label: '', sortable: false }
]

onMounted(() => refresh())

const refresh = () => checkStore.fetchCheckTypes()
const openForm = () => {
  selected.value = null
  showForm.value = true
}
const edit = (type: CheckType) => {
  selected.value = type
  showForm.value = true
}
const remove = (id: string) => checkStore.deleteCheckType(id)
</script>
