import { defineStore } from 'pinia'
import type { CheckLog, CheckPlan, CheckSummaryItem, CheckType, CheckTypeOption, DueCheckRow } from '~/types/checks'
import type { Database } from '~/types/supabase'

export const useCheckStore = defineStore('checks', () => {
  const types = ref<CheckType[]>([])
  const options = ref<CheckTypeOption[]>([])
  const summary = ref<CheckSummaryItem[]>([])
  const dueChecks = ref<DueCheckRow[]>([])
  const client = useSupabaseClient<Database>()
  const rpc = <Fn extends Extract<keyof Database['public']['Functions'], string>>(
    fn: Fn,
    args: Database['public']['Functions'][Fn]['Args']
  ) => client.rpc(fn, args as never)

  const fetchCheckTypes = async () => {
    const { data } = await client.rpc('get_check_types')
    types.value = Array.isArray(data) ? (data as CheckType[]) : []
    options.value = types.value.map((type) => ({ label: type.name, value: type.id }))
  }

  const createPlan = async (payload: Partial<CheckPlan>) => {
    await rpc('create_check_plan', { payload })
  }

  const createLog = async (payload: Partial<CheckLog>) => {
    await rpc('create_check_log', { payload })
  }

  const fetchSummary = async () => {
    const { data } = await client.rpc('get_check_summary')
    summary.value = Array.isArray(data) ? (data as CheckSummaryItem[]) : []
  }

  const fetchDueChecks = async () => {
    const { data } = await client.rpc('get_due_checks')
    dueChecks.value = Array.isArray(data) ? (data as DueCheckRow[]) : []
  }

  const saveCheckType = async (payload: Partial<CheckType>) => {
    await rpc('upsert_check_type', { payload })
    await fetchCheckTypes()
  }

  const deleteCheckType = async (id: string) => {
    await rpc('delete_check_type', { id })
    await fetchCheckTypes()
  }

  const uploadFiles = async (vehicleId: string, files: File[]) => {
    const supabase = useSupabaseClient<Database>()
    for (const file of files) {
      await supabase.storage.from('vehicle-files').upload(`${vehicleId}/${file.name}`, file, {
        upsert: true
      })
    }
  }

  const downloadFile = async (fileId: string) => {
    await rpc('download_vehicle_file', { file_id: fileId })
  }

  const deleteFile = async (fileId: string) => {
    await rpc('delete_vehicle_file', { file_id: fileId })
  }

  return {
    types,
    options,
    summary,
    dueChecks,
    fetchCheckTypes,
    createPlan,
    createLog,
    fetchSummary,
    fetchDueChecks,
    saveCheckType,
    deleteCheckType,
    uploadFiles,
    downloadFile,
    deleteFile
  }
})
