<template>
  <UPopover>
    <UButton color="gray" variant="ghost" size="sm" icon="i-mdi-translate" />
    <template #panel>
      <div class="w-40 p-2">
        <button
          v-for="locale in locales"
          :key="locale.code"
          class="flex w-full items-center justify-between rounded px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          @click="setLocale(locale.code)"
        >
          <span>{{ locale.name }}</span>
          <Icon v-if="current === locale.code" name="mdi:check" class="h-4 w-4 text-brand-500" />
        </button>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const { locales, setLocale, locale } = useI18n()
const current = computed(() => locale.value)
</script>
