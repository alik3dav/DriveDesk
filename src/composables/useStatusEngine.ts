import { differenceInDays } from 'date-fns'
import type { VehicleStatus } from '~/types/vehicles'
import type { StatusContext } from '~/types/status'

export const useStatusEngine = () => {
  const config = useRuntimeConfig()
  const defaults = config.public.notificationDefaults

  const calculate = ({ nextDate, nextKm, currentKm }: StatusContext): VehicleStatus => {
    const daysBeforeDue = defaults.daysBeforeDue
    const kmBeforeDue = defaults.kmBeforeDue

    const daysDiff = nextDate ? differenceInDays(new Date(nextDate), new Date()) : Infinity
    const kmDiff = nextKm && currentKm ? nextKm - currentKm : Infinity

    if (daysDiff <= 0 || kmDiff <= 0) {
      return 'overdue'
    }
    if (daysDiff <= daysBeforeDue || kmDiff <= kmBeforeDue) {
      return 'due-soon'
    }
    return 'ok'
  }

  return { calculate }
}
