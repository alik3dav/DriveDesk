import { defineStore } from 'pinia'
import type { Database } from '~/types/supabase'

export interface ReportConfig {
  start: string
  end: string
  sections: string[]
  format: 'pdf' | 'csv'
  groupBy: 'vehicle' | 'checkType' | 'status'
}

export interface ReportHistoryItem {
  id: string
  name: string
  createdAt: string
  format: 'pdf' | 'csv'
}

export const useReportStore = defineStore('reports', () => {
  const config = ref<ReportConfig>({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
    sections: ['vehicles', 'checks'],
    format: 'pdf',
    groupBy: 'vehicle'
  })
  const history = ref<ReportHistoryItem[]>([])
  const client = useSupabaseClient<Database>()
  const rpc = <Fn extends Extract<keyof Database['public']['Functions'], string>>(
    fn: Fn,
    args: Database['public']['Functions'][Fn]['Args']
  ) => client.rpc(fn, args as never)

  const setConfig = (value: ReportConfig) => {
    config.value = value
  }

  const fetchHistory = async () => {
    const { data } = await client.rpc('get_report_history')
    history.value = Array.isArray(data) ? (data as ReportHistoryItem[]) : []
  }

  const generate = async () => {
    await rpc('generate_report', { config: config.value })
    await fetchHistory()
  }

  return { config, history, setConfig, fetchHistory, generate }
})
