// Legacy Supabase compatibility layer
// This file provides backward compatibility for components that haven't been migrated yet
import { api } from './api'

// Export the API client as supabase for backward compatibility
export const supabase = {
  from: (table) => api.from(table),
  // Add other Supabase methods as needed for compatibility
}

// For components that import { supabase } directly
export default supabase
