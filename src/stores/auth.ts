import { defineStore } from 'pinia'
import type { Database } from '~/types/supabase'

interface Credentials {
  email: string
  password: string
}

interface RegistrationPayload extends Credentials {
  fullName?: string
}

export const useAuthStore = defineStore('auth', () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const signIn = async ({ email, password }: Credentials) => {
    loading.value = true
    error.value = null
    const { error: signInError } = await client.auth.signInWithPassword({ email, password })
    if (signInError) {
      error.value = signInError.message
    }
    loading.value = false
    return !signInError
  }

  const signUp = async ({ email, password, fullName }: RegistrationPayload) => {
    loading.value = true
    error.value = null
    const { data, error: signUpError } = await client.auth.signUp({
      email,
      password,
      options: {
        data: fullName ? { full_name: fullName } : undefined
      }
    })
    if (signUpError) {
      error.value = signUpError.message
    }
    loading.value = false
    return { user: data.user, error: signUpError }
  }

  const signOut = async () => {
    loading.value = true
    await client.auth.signOut()
    loading.value = false
  }

  return { user, loading, error, signIn, signUp, signOut }
})
