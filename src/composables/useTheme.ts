export const useTheme = () => {
  const preference = useState<'light' | 'dark'>('theme-preference', () => 'light')

  watchEffect(() => {
    if (preference.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  const toggle = () => {
    preference.value = preference.value === 'dark' ? 'light' : 'dark'
  }

  return { preference, toggle }
}
