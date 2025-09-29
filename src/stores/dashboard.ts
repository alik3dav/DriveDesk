import { defineStore } from 'pinia'
import type { DashboardState } from '~/types/dashboard'
import type { Database } from '~/types/supabase'

const initialState: DashboardState = {
  metrics: [],
  alerts: [],
  vehicles: []
}

export const useDashboardStore = defineStore('dashboard', () => {
  const dashboard = ref<DashboardState>({ ...initialState })
  const loading = ref(false)
  const client = useSupabaseClient<Database>()

  const fetchDashboard = async () => {
    loading.value = true
    try {
      const { data } = await client.rpc('get_dashboard_overview')
      if (data) {
        dashboard.value = data as DashboardState
      }
    } finally {
      loading.value = false
    }
  }

  return { dashboard, loading, fetchDashboard }
})
