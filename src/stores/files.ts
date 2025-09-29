import { useToast } from '#imports'
import { defineStore } from 'pinia'
import type { VehicleFile } from '~/types/vehicles'
import type { Database } from '~/types/supabase'

export interface FileFilterState {
  vehicle: string
  type: string
  uploadedBy: string
}

export const useFileStore = defineStore('files', () => {
  const files = ref<VehicleFile[]>([])
  const filters = ref<FileFilterState>({ vehicle: '', type: '', uploadedBy: '' })
  const client = useSupabaseClient<Database>()
  const toast = useToast()
  const rpc = <Fn extends keyof Database['public']['Functions']>(
    fn: Fn,
    args: Database['public']['Functions'][Fn]['Args']
  ) => client.rpc(fn, args as never)

  const fetchFiles = async () => {
    const { data } = await rpc('get_client_files', { filters: filters.value })
    files.value = Array.isArray(data) ? (data as VehicleFile[]) : []
  }

  const setFilters = (value: FileFilterState) => {
    filters.value = value
    fetchFiles()
  }

  const openUpload = () => {
    toast.add({ title: 'Upload', description: 'Drag files onto any vehicle to upload', color: 'brand' })
  }

  const download = (id: string) => rpc('download_vehicle_file', { file_id: id })
  const remove = (id: string) => rpc('delete_vehicle_file', { file_id: id })

  return { files, filters, fetchFiles, setFilters, openUpload, download, remove }
})
