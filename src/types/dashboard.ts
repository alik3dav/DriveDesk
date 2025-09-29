import type { VehicleStatus } from './vehicles'

export interface DashboardMetric {
  key: string
  label: string
  value: number
  icon: string
  description: string
}

export interface DashboardAlert {
  id: string
  vehicleId: string
  title: string
  description: string
  status: VehicleStatus
}

export interface DashboardVehicleSummary {
  id: string
  displayName: string
  make: string
  model: string
  year: number
  odometer: number
  nextService?: string
  status: VehicleStatus
}

export interface DashboardState {
  metrics: DashboardMetric[]
  alerts: DashboardAlert[]
  vehicles: DashboardVehicleSummary[]
}
