import { defineStore } from 'pinia'
import type { SubscriptionState } from '~/types/subscriptions'

export const useSubscriptionStore = defineStore('subscription', () => {
  const subscription = ref<SubscriptionState>({
    id: '',
    status: 'trial',
    trial: {
      status: 'active',
      startedAt: new Date().toISOString(),
      endsAt: new Date().toISOString(),
      progress: 0,
      message: ''
    }
  })
  const client = useSupabaseClient()

  const fetchSubscription = async () => {
    const { data } = await client.rpc('get_subscription_state')
    if (data) {
      subscription.value = data as SubscriptionState
    }
  }

  const extendTrial = async () => {
    await client.rpc('extend_trial_period')
    await fetchSubscription()
  }

  const activate = async () => {
    await client.rpc('activate_subscription')
    await fetchSubscription()
  }

  watchEffect(() => {
    if (!subscription.value.id) {
      fetchSubscription()
    }
  })

  return { subscription, fetchSubscription, extendTrial, activate }
})
