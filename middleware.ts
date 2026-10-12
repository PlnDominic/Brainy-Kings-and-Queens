import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  let response = NextResponse.next({ request })
  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(loginUrl)
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_cms_admin')
  if (adminError || !isAdmin) {
    return NextResponse.redirect(new URL('/admin/login?error=unauthorized', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
