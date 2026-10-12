import { createSupabaseServerClient } from './supabase-server'
import type { Database } from '@/types/database'

type Programs = Database['public']['Tables']['programs']['Row']
export type PageSection = Database['public']['Tables']['page_sections']['Row']
type HeroSlide = Database['public']['Tables']['hero_slides']['Row']
type SchoolValue = Database['public']['Tables']['values']['Row']
type Principle = Database['public']['Tables']['principles']['Row']
type Testimonial = Database['public']['Tables']['testimonials']['Row']
type GalleryItem = Database['public']['Tables']['gallery_items']['Row']
type AdmissionsStep = Database['public']['Tables']['admissions_steps']['Row']
type TeamMember = Database['public']['Tables']['team_members']['Row']
type SiteSettings = Database['public']['Tables']['site_settings']['Row']

// Normalize Supabase/network errors into a serializable form for RSC.
function normalizeError(err: unknown): Error {
  if (err instanceof Error) {
    return new Error(`${err.name}: ${err.message}`)
  }
  if (typeof err === 'object' && err !== null) {
    const queryError = err as {
      message?: unknown
      code?: unknown
      details?: unknown
      hint?: unknown
    }
    const parts = [
      typeof queryError.message === 'string' ? queryError.message : 'Unknown Supabase error',
      typeof queryError.code === 'string' ? `code: ${queryError.code}` : null,
      typeof queryError.details === 'string' ? `details: ${queryError.details}` : null,
      typeof queryError.hint === 'string' ? `hint: ${queryError.hint}` : null,
    ].filter((part): part is string => part !== null)
    return new Error(`Supabase query failed: ${parts.join(' | ')}`)
  }
  return new Error(`Supabase query failed: ${String(err)}`)
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()

    if (error) throw error
    return data as SiteSettings | null
  } catch (err) {
    throw normalizeError(err)
  }
}

export async function getPageSections(pageKey: string) {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_key', pageKey)
      .eq('is_published', true)
      .order('display_order')

    if (error) throw error
    return (data || []) as PageSection[]
  } catch (err) {
    throw normalizeError(err)
  }
}

// Hero Slides
export async function getHeroSlides() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('display_order')

    if (error) throw error
    return (data || []) as HeroSlide[]
  } catch (err) {
    throw normalizeError(err)
  }
}

// Values
export async function getValues() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('values')
      .select('*')
      .order('display_order')

    if (error) throw error
    return (data || []) as SchoolValue[]
  } catch (err) {
    throw normalizeError(err)
  }
}

// Principles
export async function getPrinciples() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('principles')
      .select('*')
      .order('display_order')

    if (error) throw error
    return (data || []) as Principle[]
  } catch (err) {
    throw normalizeError(err)
  }
}

// Programs
export async function getPrograms() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_published', true)
      .order('display_order')

    if (error) throw error
    return (data || []) as Programs[]
  } catch (err) {
    throw normalizeError(err)
  }
}

// Testimonials
export async function getTestimonials() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('display_order')

    if (error) throw error
    return (data || []) as Testimonial[]
  } catch (err) {
    throw normalizeError(err)
  }
}

// Gallery Items
export async function getGalleryItems(pageKey = 'home') {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('page_key', pageKey)
      .eq('is_published', true)
      .order('row_index')
      .order('column_index')

    if (error) throw error
    return (data || []) as GalleryItem[]
  } catch (err) {
    throw normalizeError(err)
  }
}

// Admissions Steps
export async function getAdmissionsSteps() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('admissions_steps')
      .select('*')
      .eq('is_published', true)
      .order('display_order')

    if (error) throw error
    return (data || []) as AdmissionsStep[]
  } catch (err) {
    throw normalizeError(err)
  }
}

// Team Members
export async function getTeamMembers() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_published', true)
      .order('display_order')

    if (error) throw error
    return (data || []) as TeamMember[]
  } catch (err) {
    throw normalizeError(err)
  }
}

// Stats
export async function getStats() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()

    if (error) throw error
    return data
  } catch (err) {
    throw normalizeError(err)
  }
}