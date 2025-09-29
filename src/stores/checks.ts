import { defineStore } from 'pinia'
import type { CheckLog, CheckPlan, CheckSummaryItem, CheckType, CheckTypeOption, DueCheckRow } from '~/types/checks'

export const useCheckStore = defineStore('checks', () => {
  const types = ref<CheckType[]>([])
  const options = ref<CheckTypeOption[]>([])
  const summary = ref<CheckSummaryItem[]>([])
  const dueChecks = ref<DueCheckRow[]>([])
  const client = useSupabaseClient()

  const fetchCheckTypes = async () => {
    const { data } = await client.rpc('get_check_types')
    types.value = (data as CheckType[]) ?? []
    options.value = types.value.map((type) => ({ label: type.name, value: type.id }))
  }

  const createPlan = async (payload: Partial<CheckPlan>) => {
    await client.rpc('create_check_plan', { payload })
  }

  const createLog = async (payload: Partial<CheckLog>) => {
    await client.rpc('create_check_log', { payload })
  }

  const fetchSummary = async () => {
    const { data } = await client.rpc('get_check_summary')
    summary.value = (data as CheckSummaryItem[]) ?? []
  }

  const fetchDueChecks = async () => {
    const { data } = await client.rpc('get_due_checks')
    dueChecks.value = (data as DueCheckRow[]) ?? []
  }

  const saveCheckType = async (payload: Partial<CheckType>) => {
    await client.rpc('upsert_check_type', { payload })
    await fetchCheckTypes()
  }

  const deleteCheckType = async (id: string) => {
    await client.rpc('delete_check_type', { id })
    await fetchCheckTypes()
  }

  const uploadFiles = async (vehicleId: string, files: File[]) => {
    const supabase = useSupabaseClient()
    for (const file of files) {
      await supabase.storage.from('vehicle-files').upload(`${vehicleId}/${file.name}`, file, {
        upsert: true
      })
    }
  }

  const downloadFile = async (fileId: string) => {
    await client.rpc('download_vehicle_file', { file_id: fileId })
  }

  const deleteFile = async (fileId: string) => {
    await client.rpc('delete_vehicle_file', { file_id: fileId })
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
