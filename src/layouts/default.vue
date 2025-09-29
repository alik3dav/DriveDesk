<template>
  <div class="flex min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <AppSidebar class="hidden md:flex" />
    <div class="flex min-h-screen flex-1 flex-col">
      <AppCommandBar />
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Layout composition handled via components
</script>
