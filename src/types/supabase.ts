export type GenericTable = {
  Row: Record<string, unknown>
  Insert: Record<string, unknown>
  Update: Record<string, unknown>
  Relationships?: never
}

export type GenericFunction = {
  Args: Record<string, unknown>
  Returns: unknown
}

export type Database = {
  public: {
    Tables: Record<string, GenericTable>
    Views: Record<string, GenericTable>
    Functions: Record<string, GenericFunction>
    Enums: Record<string, unknown>
    CompositeTypes: Record<string, unknown>
  }
}
