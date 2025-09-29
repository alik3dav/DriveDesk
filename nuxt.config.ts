import { defineNuxtConfig } from 'nuxt/config'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src',
  typescript: {
    strict: true,
    typeCheck: true
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/ui'
  ],
  alias: {
    '#tailwind-config': resolve(currentDir, 'tailwind-config')
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/theme.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  tailwindcss: {
    viewer: true
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'el', iso: 'el-GR', file: 'el.json', name: 'Ελληνικά' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default'
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/callback',
      exclude: ['/auth/callback']
    }
  },
  runtimeConfig: {
    public: {
      appName: 'DriveDesk',
      trialLengthDays: 90,
      notificationDefaults: {
        daysBeforeDue: 14,
        kmBeforeDue: 500
      }
    }
  }
})
