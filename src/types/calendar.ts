import type { VehicleStatus } from './vehicles'

export interface CalendarEvent {
  id: string
  vehicleId: string
  vehicle: string
  checkType: string
  date: string
  status: VehicleStatus
  title: string
}
