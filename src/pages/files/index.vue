<template>
  <div class="space-y-6">
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ $t('files.title') }}</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('files.subtitle') }}</p>
      </div>
      <div class="flex gap-2">
        <UButton color="gray" variant="soft" icon="i-mdi-filter" @click="toggleFilters">{{ $t('common.filters') }}</UButton>
        <UButton icon="i-mdi-upload" @click="upload">{{ $t('files.upload') }}</UButton>
      </div>
    </div>

    <FileFilters v-if="showFilters" :filters="filters" @update:filters="updateFilters" />
    <FileDataGrid :files="files" />
  </div>
</template>

<script setup lang="ts">
const fileStore = useFileStore()
const { files, filters } = storeToRefs(fileStore)
const showFilters = ref(false)

onMounted(() => {
  fileStore.fetchFiles()
})

const toggleFilters = () => (showFilters.value = !showFilters.value)
const updateFilters = (value: typeof filters.value) => fileStore.setFilters(value)
const upload = () => fileStore.openUpload()
</script>
