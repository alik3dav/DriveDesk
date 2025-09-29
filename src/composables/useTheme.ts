export const useTheme = () => {
  const preference = useState<'light' | 'dark'>('theme-preference', () => 'light')

  watchEffect(() => {
    if (!import.meta.client) {
      return
    }

    const root = document.documentElement

    if (preference.value === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  })

  const toggle = () => {
    preference.value = preference.value === 'dark' ? 'light' : 'dark'
  }

  return { preference, toggle }
}
