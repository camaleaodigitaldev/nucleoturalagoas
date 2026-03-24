/**
 * NúcleoTur Alagoas — Database Setup Script
 *
 * Run with: npx tsx scripts/setup-db.ts
 *
 * This script runs all migrations against the Supabase project
 * using the service role key.
 */

import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { join } from "path"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const migrations = [
  "0001_schema.sql",
  "0002_rls.sql",
  "0003_storage.sql",
  "0004_seed.sql",
]

async function runMigrations() {
  console.log("🚀 Running NúcleoTur database migrations...\n")

  for (const migration of migrations) {
    const filePath = join(process.cwd(), "supabase", "migrations", migration)
    const sql = readFileSync(filePath, "utf-8")

    console.log(`📄 Applying: ${migration}`)

    const { error } = await supabase.rpc("exec_sql" as never, { sql } as never)

    if (error) {
      console.error(`❌ Error in ${migration}:`, error.message)
      console.log("\nNote: Run the SQL files manually in the Supabase SQL editor:")
      console.log("  https://supabase.com/dashboard/project/xehtfqkzowesqmannzug/sql")
      process.exit(1)
    }

    console.log(`✅ Done: ${migration}\n`)
  }

  console.log("🎉 All migrations applied successfully!")
}

runMigrations().catch(console.error)
