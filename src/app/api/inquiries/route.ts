import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isMailConfigured, sendInquiryEmail } from '@/lib/mailer'

// nodemailer needs the Node.js runtime, and every request must run fresh.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX = { name: 120, phone: 40, email: 160, age: 80, source: 40 }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Best-effort limit per visitor (resets when the server instance restarts).
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const recent = new Map<string, number[]>()

function tooManyRequests(ip: string) {
  const now = Date.now()
  const hits = (recent.get(ip) || []).filter((time) => now - time < WINDOW_MS)
  hits.push(now)
  recent.set(ip, hits)
  if (recent.size > 5000) recent.clear()
  return hits.length > MAX_PER_WINDOW
}

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Hidden field that real visitors never fill in; bots usually do. Pretend it worked.
  if (text(body.reference_code, 200)) return NextResponse.json({ ok: true })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (tooManyRequests(ip)) {
    return NextResponse.json({ error: 'Too many inquiries from this device. Please try again later or call us.' }, { status: 429 })
  }

  const inquiry = {
    parentName: text(body.parent_name, MAX.name),
    phone: text(body.phone, MAX.phone),
    email: text(body.email, MAX.email),
    childAge: text(body.child_age, MAX.age),
    preferredStartDate: /^\d{4}-\d{2}-\d{2}$/.test(text(body.preferred_start_date, 10)) ? text(body.preferred_start_date, 10) : null,
    referralSource: text(body.referral_source, MAX.source) || null,
  }

  if (!inquiry.parentName || !inquiry.phone || !inquiry.childAge || !EMAIL_PATTERN.test(inquiry.email)) {
    return NextResponse.json({ error: 'Please fill in your name, phone, a valid email and your child’s age.' }, { status: 400 })
  }

  // 1. Keep a copy in the Content Studio inbox.
  let saved = false
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
    const { error } = await supabase.from('admissions_inquiries').insert({
      parent_name: inquiry.parentName,
      phone: inquiry.phone,
      email: inquiry.email,
      child_age: inquiry.childAge,
      preferred_start_date: inquiry.preferredStartDate,
      referral_source: inquiry.referralSource,
    })
    if (error) console.error('Inquiry was not saved to Supabase:', error.message)
    else saved = true
  }

  // 2. Email it to the school.
  let emailed = false
  if (isMailConfigured()) {
    try {
      await sendInquiryEmail(inquiry)
      emailed = true
    } catch (error) {
      console.error('Inquiry email failed:', error instanceof Error ? error.message : error)
    }
  } else {
    console.warn('GMAIL_USER / GMAIL_APP_PASSWORD are not set, so inquiries are not emailed.')
  }

  // The visitor only sees an error if the inquiry reached the school neither way.
  if (!saved && !emailed) {
    return NextResponse.json({ error: 'We could not send your inquiry right now. Please call us or try again shortly.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
