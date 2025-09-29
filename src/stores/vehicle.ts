import { defineStore } from 'pinia'
import type { VehicleDetail, VehicleFile, VehicleFormState, VehicleHistoryItem, VehicleListItem } from '~/types/vehicles'
import type { CheckLog, CheckPlan } from '~/types/checks'
import type { Database } from '~/types/supabase'

export interface VehicleFilterState {
  status: 'all' | 'ok' | 'due-soon' | 'overdue'
  make: string
  model: string
  year: string | number | ''
}

interface VehicleDetailState {
  vehicle: VehicleDetail
  checkPlans: CheckPlan[]
  checkLogs: CheckLog[]
  history: VehicleHistoryItem[]
  files: VehicleFile[]
}

export const useVehicleStore = defineStore('vehicles', () => {
  const vehicles = ref<VehicleListItem[]>([])
  const filters = ref<VehicleFilterState>({ status: 'all', make: '', model: '', year: '' })
  const vehicleDetail = ref<VehicleDetailState>({
    vehicle: {
      id: '',
      plate: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      vin: '',
      odometer: 0,
      status: 'ok',
      displayName: '',
      trial: {
        status: 'active',
        startedAt: new Date().toISOString(),
        endsAt: new Date().toISOString(),
        progress: 0,
        message: ''
      }
    },
    checkPlans: [],
    checkLogs: [],
    history: [],
    files: []
  })
  const client = useSupabaseClient<Database>()
  const rpc = <Fn extends keyof Database['public']['Functions']>(
    fn: Fn,
    args: Database['public']['Functions'][Fn]['Args']
  ) => client.rpc(fn, args as never)

  const filteredVehicles = computed(() => {
    return vehicles.value.filter((vehicle) => {
      if (filters.value.status !== 'all' && vehicle.status !== filters.value.status) return false
      if (filters.value.make && !vehicle.make.toLowerCase().includes(filters.value.make.toLowerCase())) return false
      if (filters.value.model && !vehicle.model.toLowerCase().includes(filters.value.model.toLowerCase())) return false
      if (filters.value.year && vehicle.year !== Number(filters.value.year)) return false
      return true
    })
  })

  const fetchVehicles = async () => {
    const { data } = await client.rpc('get_client_vehicles')
    vehicles.value = Array.isArray(data) ? (data as VehicleListItem[]) : []
  }

  const fetchVehicleDetail = async (id: string) => {
    const { data } = await rpc('get_vehicle_detail', { p_vehicle_id: id })
    if (data) {
      vehicleDetail.value = data as VehicleDetailState
    }
  }

  const setFilters = (value: VehicleFilterState) => {
    filters.value = value
  }

  const saveVehicle = async (payload: VehicleFormState) => {
    await rpc('upsert_vehicle', { payload: payload as unknown as Record<string, unknown> })
    await fetchVehicles()
  }

  const exportFleet = () => {
    client.rpc('export_client_vehicles')
  }

  return {
    vehicles,
    filters,
    vehicleDetail,
    filteredVehicles,
    fetchVehicles,
    fetchVehicleDetail,
    setFilters,
    saveVehicle,
    exportFleet
  }
})
