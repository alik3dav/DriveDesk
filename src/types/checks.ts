import type { VehicleStatus } from './vehicles'

export interface CheckType {
  id: string
  name: string
  description?: string
  defaultFrequencyDays: number
  defaultFrequencyKm?: number
}

export interface CheckPlan {
  id: string
  vehicleId: string
  checkTypeId: string
  name: string
  status: VehicleStatus
  frequencyDays: number
  frequencyKm?: number
  nextDueDate?: string
}

export interface CheckLog {
  id: string
  checkPlanId: string
  vehicleId: string
  checkName: string
  status: VehicleStatus
  performedAt: string
  odometer?: number
  notes?: string
}

export interface CheckSummaryItem {
  status: VehicleStatus | 'all'
  count: number
  description: string
}

export interface DueCheckRow {
  id: string
  vehicle: string
  checkType: string
  status: VehicleStatus
  dueDate?: string
  dueKm?: number
}

export interface CheckTypeOption {
  label: string
  value: string
}
