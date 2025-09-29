export interface NotificationOptions {
  title?: string
  description?: string
}

export const useNotifier = () => {
  const notify = (options: NotificationOptions) => {
    const message = [options.title, options.description].filter(Boolean).join('\n')

    if (!message) {
      return
    }

    if (process.client && typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(message)
    }
  }

  return { notify }
}
