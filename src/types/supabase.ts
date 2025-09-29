type GenericTable = {
  Row: Record<string, unknown>
  Insert: Record<string, unknown>
  Update: Record<string, unknown>
  Relationships?: never
}

type ProfilesTable = {
  Row: {
    id: string
    email: string
    full_name: string | null
    phone: string | null
    role: 'admin' | 'manager' | 'viewer'
    client_id: string
    subscription_status: 'active' | 'locked'
  }
  Insert: {
    id?: string
    email: string
    full_name?: string | null
    phone?: string | null
    role: 'admin' | 'manager' | 'viewer'
    client_id: string
    subscription_status?: 'active' | 'locked'
  }
  Update: {
    email?: string
    full_name?: string | null
    phone?: string | null
    role?: 'admin' | 'manager' | 'viewer'
    client_id?: string
    subscription_status?: 'active' | 'locked'
  }
  Relationships?: never
}

type SupabaseFunctions = {
  get_calendar_events: {
    Args: {
      p_start: string
      p_end: string
    }
    Returns: unknown
  }
  create_check_plan: {
    Args: {
      payload: Record<string, unknown>
    }
    Returns: unknown
  }
  create_check_log: {
    Args: {
      payload: Record<string, unknown>
    }
    Returns: unknown
  }
  get_check_summary: {
    Args: Record<string, never>
    Returns: unknown
  }
  get_due_checks: {
    Args: Record<string, never>
    Returns: unknown
  }
  get_check_types: {
    Args: Record<string, never>
    Returns: unknown
  }
  upsert_check_type: {
    Args: {
      payload: Record<string, unknown>
    }
    Returns: unknown
  }
  delete_check_type: {
    Args: {
      id: string
    }
    Returns: unknown
  }
  download_vehicle_file: {
    Args: {
      file_id: string
    }
    Returns: unknown
  }
  delete_vehicle_file: {
    Args: {
      file_id: string
    }
    Returns: unknown
  }
  get_client_files: {
    Args: {
      filters: Record<string, unknown>
    }
    Returns: unknown
  }
  generate_report: {
    Args: {
      config: Record<string, unknown>
    }
    Returns: unknown
  }
  get_report_history: {
    Args: Record<string, never>
    Returns: unknown
  }
  save_notification_settings: {
    Args: {
      settings: Record<string, unknown>
    }
    Returns: unknown
  }
  get_active_profile: {
    Args: Record<string, never>
    Returns: unknown
  }
  get_client_vehicles: {
    Args: Record<string, never>
    Returns: unknown
  }
  get_vehicle_detail: {
    Args: {
      p_vehicle_id: string
    }
    Returns: unknown
  }
  upsert_vehicle: {
    Args: {
      payload: Record<string, unknown>
    }
    Returns: unknown
  }
  export_client_vehicles: {
    Args: Record<string, never>
    Returns: unknown
  }
}

export type Database = {
  public: {
    Tables: {
      profiles: ProfilesTable
    }
    Views: Record<string, GenericTable>
    Functions: SupabaseFunctions
    Enums: Record<string, unknown>
    CompositeTypes: Record<string, unknown>
  }
}
