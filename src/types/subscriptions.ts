export interface TrialInfo {
  status: 'active' | 'expiring-soon' | 'expired'
  startedAt: string
  endsAt: string
  progress: number
  message: string
}

export interface SubscriptionState {
  id: string
  status: 'trial' | 'active' | 'inactive'
  trial: TrialInfo
}
