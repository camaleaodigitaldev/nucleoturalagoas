import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

/**
 * Server-only admin client — bypasses RLS.
 * Only import in Server Actions / Route Handlers, never in browser code.
 */
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
