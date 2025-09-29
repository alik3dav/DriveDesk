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

  const fetchFiles = async () => {
    const { data } = await client.rpc('get_client_files', { filters: filters.value })
    files.value = Array.isArray(data) ? (data as VehicleFile[]) : []
  }

  const setFilters = (value: FileFilterState) => {
    filters.value = value
    fetchFiles()
  }

  const openUpload = () => {
    useToast().add({ title: 'Upload', description: 'Drag files onto any vehicle to upload', color: 'brand' })
  }

  const download = (id: string) => client.rpc('download_vehicle_file', { file_id: id })
  const remove = (id: string) => client.rpc('delete_vehicle_file', { file_id: id })

  return { files, filters, fetchFiles, setFilters, openUpload, download, remove }
})
