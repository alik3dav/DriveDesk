import type { TrialInfo } from './subscriptions'

export type VehicleStatus = 'ok' | 'due-soon' | 'overdue'

export interface VehicleListItem {
  id: string
  plate: string
  make: string
  model: string
  year: number
  vin: string
  status: VehicleStatus
  odometer: number
  nextCheck?: string
}

export interface VehicleFormState {
  id?: string
  plate: string
  make: string
  model: string
  year: number
  vin: string
  odometer: number
  status: VehicleStatus
  notes?: string
}

export interface VehicleDetail extends Omit<VehicleFormState, 'id'> {
  id: string
  displayName: string
  lastService?: string
  nextService?: string
  trial: TrialInfo
}

export interface VehicleHistoryItem {
  id: string
  title: string
  date: string
  description: string
}

export interface VehicleFile {
  id: string
  vehicleId: string
  vehicle: string
  name: string
  type: string
  size: number
  uploadedAt: string
  uploadedBy: string
}
