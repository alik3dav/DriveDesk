import { defineStore } from 'pinia'
import type { CalendarEvent } from '~/types/calendar'
import type { Database } from '~/types/supabase'

export const useCalendarStore = defineStore('calendar', () => {
  const events = ref<CalendarEvent[]>([])
  const client = useSupabaseClient<Database>()

  const rpc = <Fn extends Extract<keyof Database['public']['Functions'], string>>(
    fn: Fn,
    args: Database['public']['Functions'][Fn]['Args']
  ) => client.rpc(fn, args as never)

  const fetchEvents = async (range: { start: Date; end: Date }) => {
    const { data } = await rpc('get_calendar_events', {
      p_start: range.start.toISOString(),
      p_end: range.end.toISOString()
    })
    events.value = Array.isArray(data) ? (data as CalendarEvent[]) : []
  }

  return { events, fetchEvents }
})
