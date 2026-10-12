/* eslint-disable @typescript-eslint/no-empty-object-type */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type WithRelationships<Tables> = {
  [TableName in keyof Tables]: Tables[TableName] & { Relationships: [] }
}

export interface Database {
  public: {
    Tables: WithRelationships<{
      site_settings: {
        Row: {
          id: string
          phone: string | null
          email: string | null
          address: string | null
          hours: string | null
          copyright_year: number
          privacy_policy_link: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          hours?: string | null
          copyright_year?: number
          privacy_policy_link?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          hours?: string | null
          copyright_year?: number
          privacy_policy_link?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      page_sections: {
        Row: {
          id: string
          page_key: string
          section_key: string
          eyebrow: string | null
          heading: string | null
          body: string | null
          secondary_body: string | null
          image_url: string | null
          cta_label: string | null
          cta_href: string | null
          is_published: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_key: string
          section_key: string
          eyebrow?: string | null
          heading?: string | null
          body?: string | null
          secondary_body?: string | null
          image_url?: string | null
          cta_label?: string | null
          cta_href?: string | null
          is_published?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_key?: string
          section_key?: string
          eyebrow?: string | null
          heading?: string | null
          body?: string | null
          secondary_body?: string | null
          image_url?: string | null
          cta_label?: string | null
          cta_href?: string | null
          is_published?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      hero_slides: {
        Row: {
          id: string
          title: string | null
          subtitle: string | null
          image_url: string
          alt_text: string
          link: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          subtitle?: string | null
          image_url: string
          alt_text: string
          link?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          subtitle?: string | null
          image_url?: string
          alt_text?: string
          link?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      values: {
        Row: {
          id: string
          icon: string
          title: string
          body: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          icon: string
          title: string
          body: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          icon?: string
          title?: string
          body?: string
          display_order?: number
          created_at?: string
        }
      }
      principles: {
        Row: {
          id: string
          icon: string
          title: string
          body: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          icon: string
          title: string
          body: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          icon?: string
          title?: string
          body?: string
          display_order?: number
          created_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          number: string
          level: string
          age_range: string
          tagline: string
          description: string
          features: string[]
          icon: string
          image_url: string
          border_color: string | null
          accent_text_color: string | null
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          number: string
          level: string
          age_range: string
          tagline: string
          description: string
          features: string[]
          icon: string
          image_url: string
          border_color?: string | null
          accent_text_color?: string | null
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          number?: string
          level?: string
          age_range?: string
          tagline?: string
          description?: string
          features?: string[]
          icon?: string
          image_url?: string
          border_color?: string | null
          accent_text_color?: string | null
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          quote: string
          name: string
          role: string
          display_order: number
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          quote: string
          name: string
          role: string
          display_order?: number
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          quote?: string
          name?: string
          role?: string
          display_order?: number
          is_published?: boolean
          created_at?: string
        }
      }
      gallery_items: {
        Row: {
          id: string
          page_key: string
          row_index: number
          column_index: number
          image_url: string
          alt_text: string
          caption: string | null
          display_order: number
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          page_key?: string
          row_index: number
          column_index: number
          image_url: string
          alt_text: string
          caption?: string | null
          display_order?: number
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          page_key?: string
          row_index?: number
          column_index?: number
          image_url?: string
          alt_text?: string
          caption?: string | null
          display_order?: number
          is_published?: boolean
          created_at?: string
        }
      }
      admissions_steps: {
        Row: {
          id: string
          number: string
          icon: string
          title: string
          body: string
          display_order: number
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          number: string
          icon: string
          title: string
          body: string
          display_order?: number
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          number?: string
          icon?: string
          title?: string
          body?: string
          display_order?: number
          is_published?: boolean
          created_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          image_url: string | null
          alt_text: string | null
          social_media: Json
          display_order: number
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          image_url?: string | null
          alt_text?: string | null
          social_media?: Json
          display_order?: number
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          image_url?: string | null
          alt_text?: string | null
          social_media?: Json
          display_order?: number
          is_published?: boolean
          created_at?: string
        }
      }
      media_library: {
        Row: {
          id: string
          file_path: string
          original_name: string | null
          mime_type: string | null
          size_bytes: number | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          file_path: string
          original_name?: string | null
          mime_type?: string | null
          size_bytes?: number | null
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          file_path?: string
          original_name?: string | null
          mime_type?: string | null
          size_bytes?: number | null
          uploaded_by?: string | null
          created_at?: string
        }
        Relationships: []
      }
      admissions_inquiries: {
        Row: {
          id: string
          parent_name: string
          phone: string
          email: string
          child_age: string
          preferred_start_date: string | null
          referral_source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          parent_name: string
          phone: string
          email: string
          child_age: string
          preferred_start_date?: string | null
          referral_source?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          parent_name?: string
          phone?: string
          email?: string
          child_age?: string
          preferred_start_date?: string | null
          referral_source?: string | null
          created_at?: string
        }
        Relationships: []
      }
      admins: {
        Row: {
          id: string
          is_super_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          is_super_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          is_super_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }>
    Views: {}
    Functions: {
      is_cms_admin: { Args: Record<string, never>; Returns: boolean }
      is_cms_super_admin: { Args: Record<string, never>; Returns: boolean }
    }
    Enums: {}
    CompositeTypes: {}
  }
}
