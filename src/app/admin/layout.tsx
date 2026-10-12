import { SupabaseProvider } from '@/lib/supabase-context'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <SupabaseProvider>{children}</SupabaseProvider>
}
