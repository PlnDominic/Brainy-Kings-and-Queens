import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export function createSupabaseServerClient() {
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      async get(name: string) {
        const cookieStore = await cookies()
        return cookieStore.get(name)?.value
      },
      async set(name: string, value: string, options: any) {
        try {
          const cookieStore = await cookies()
          cookieStore.set(name, value, options)
        } catch {
          // Server Components cannot write cookies; middleware refreshes auth cookies.
        }
      },
      async remove(name: string, options: any) {
        try {
          const cookieStore = await cookies()
          cookieStore.delete(name)
        } catch {
          // Server Components cannot write cookies; middleware refreshes auth cookies.
        }
      },
    },
  })
}
