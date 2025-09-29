<template>
  <header
    class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/70 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/40"
  >
    <div class="flex items-center gap-3">
      <button class="md:hidden">
        <Icon name="lucide:menu" class="h-6 w-6" />
      </button>
      <slot name="breadcrumbs">
        <nav class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <NuxtLink to="/" class="hover:text-brand-500">{{ $t('navigation.dashboard') }}</NuxtLink>
        </nav>
      </slot>
    </div>
    <div class="flex items-center gap-4">
      <UButton size="sm" color="gray" variant="ghost" icon="i-lucide-sun-moon" @click="toggleTheme" />
      <LocaleSwitcher />
      <UserMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
const theme = useTheme()

const toggleTheme = () => {
  theme.toggle()
}
</script>
