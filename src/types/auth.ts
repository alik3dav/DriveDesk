export interface UserProfile {
  id: string
  email: string
  fullName: string
  role: 'admin' | 'manager' | 'viewer'
  phone?: string | null
  clientId: string
  subscriptionStatus: 'active' | 'locked'
}
