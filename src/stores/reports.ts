import { defineStore } from 'pinia'

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
  const client = useSupabaseClient()

  const setConfig = (value: ReportConfig) => {
    config.value = value
  }

  const fetchHistory = async () => {
    const { data } = await client.rpc('get_report_history')
    history.value = (data as ReportHistoryItem[]) ?? []
  }

  const generate = async () => {
    await client.rpc('generate_report', { config: config.value })
    await fetchHistory()
  }

  return { config, history, setConfig, fetchHistory, generate }
})
