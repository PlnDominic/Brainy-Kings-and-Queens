// Central description of everything the CMS can manage, organised the same way
// the public website is: pages → sections → the collections that feed them.

export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'list' | 'image' | 'date' | 'json' | 'icon' | 'select'

export type CmsField = {
  key: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  help?: string
  options?: { value: string; label: string }[]
  /** Group heading inside the editor drawer. */
  group?: string
  /** Span both columns of the editor grid. */
  wide?: boolean
}

export type CmsRecord = Record<string, any>

export type CmsResource = {
  key: string
  label: string
  singular: string
  description: string
  icon: string
  table: string
  titleField: string
  subtitleField?: string
  imageField?: string
  statusField?: string
  orderField?: string
  orderDescending?: boolean
  /** Fixed values applied to every record (e.g. gallery page). */
  scope?: Record<string, string>
  fields: CmsField[]
}

export const PUBLISH: CmsField = { key: 'is_published', label: 'Visible on website', type: 'boolean', group: 'Publishing' }
const ORDER: CmsField = { key: 'display_order', label: 'Display order', type: 'number', group: 'Publishing', help: 'Lower numbers appear first.' }

export const collections: CmsResource[] = [
  {
    key: 'hero_slides', label: 'Homepage slides', singular: 'slide', icon: 'view_carousel',
    description: 'The full-screen photo slideshow at the top of the home page.',
    table: 'hero_slides', titleField: 'title', subtitleField: 'subtitle', imageField: 'image_url', statusField: 'is_active',
    fields: [
      { key: 'image_url', label: 'Slide photo', type: 'image', required: true, group: 'Photo', wide: true },
      { key: 'alt_text', label: 'Photo description', type: 'text', required: true, group: 'Photo', wide: true, help: 'Describe the photo for screen readers and search engines.' },
      { key: 'title', label: 'Title', type: 'text', group: 'Text' },
      { key: 'link', label: 'Link', type: 'text', placeholder: '/admissions', group: 'Text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', group: 'Text', wide: true },
      ORDER,
      { key: 'is_active', label: 'Visible on website', type: 'boolean', group: 'Publishing' },
    ],
  },
  {
    key: 'programs', label: 'Academic programs', singular: 'program', icon: 'school',
    description: 'Programme cards on the home page and the detailed curriculum timeline.',
    table: 'programs', titleField: 'level', subtitleField: 'age_range', imageField: 'image_url', statusField: 'is_published',
    fields: [
      { key: 'level', label: 'Program name', type: 'text', required: true, group: 'Overview' },
      { key: 'number', label: 'Number', type: 'text', required: true, placeholder: '01', group: 'Overview' },
      { key: 'age_range', label: 'Age range', type: 'text', required: true, placeholder: 'Ages 2.5 – 6', group: 'Overview' },
      { key: 'icon', label: 'Icon', type: 'icon', required: true, group: 'Overview' },
      { key: 'tagline', label: 'Tagline', type: 'text', required: true, group: 'Overview', wide: true },
      { key: 'description', label: 'Description', type: 'textarea', required: true, group: 'Overview', wide: true },
      { key: 'features', label: 'Key features', type: 'list', group: 'Overview', wide: true, help: 'One feature per line.' },
      { key: 'image_url', label: 'Program photo', type: 'image', required: true, group: 'Photo', wide: true },
      { key: 'border_color', label: 'Border style', type: 'select', group: 'Appearance', options: [
        { value: 'border-primary', label: 'Red' }, { value: 'border-secondary', label: 'Maroon' },
        { value: 'border-primary-container', label: 'Light red' }, { value: 'border-outline', label: 'Muted' },
      ] },
      { key: 'accent_text_color', label: 'Accent colour', type: 'select', group: 'Appearance', options: [
        { value: 'text-primary', label: 'Red' }, { value: 'text-secondary', label: 'Maroon' },
        { value: 'text-primary-container', label: 'Light red' }, { value: 'text-outline', label: 'Muted' },
      ] },
      ORDER, PUBLISH,
    ],
  },
  {
    key: 'testimonials', label: 'Testimonials', singular: 'testimonial', icon: 'format_quote',
    description: 'Parent stories shown on the home page.',
    table: 'testimonials', titleField: 'name', subtitleField: 'quote', statusField: 'is_published',
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea', required: true, group: 'Testimonial', wide: true },
      { key: 'name', label: 'Name', type: 'text', required: true, group: 'Testimonial' },
      { key: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Parent · Pre-School', group: 'Testimonial' },
      ORDER, PUBLISH,
    ],
  },
  {
    key: 'gallery_home', label: 'Home gallery', singular: 'photo', icon: 'photo_library',
    description: 'The “Campus Life” photo grid on the home page.',
    table: 'gallery_items', titleField: 'caption', subtitleField: 'alt_text', imageField: 'image_url', statusField: 'is_published',
    scope: { page_key: 'home' },
    fields: galleryFields(),
  },
  {
    key: 'gallery_about', label: 'About gallery', singular: 'photo', icon: 'photo_library',
    description: 'The photo grid on the About page.',
    table: 'gallery_items', titleField: 'caption', subtitleField: 'alt_text', imageField: 'image_url', statusField: 'is_published',
    scope: { page_key: 'about' },
    fields: galleryFields(),
  },
  {
    key: 'values', label: 'School values', singular: 'value', icon: 'diamond',
    description: '“What We Stand For” cards on the About page.',
    table: 'values', titleField: 'title', subtitleField: 'body',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, group: 'Value' },
      { key: 'icon', label: 'Icon', type: 'icon', required: true, group: 'Value' },
      { key: 'body', label: 'Description', type: 'textarea', required: true, group: 'Value', wide: true },
      ORDER,
    ],
  },
  {
    key: 'team_members', label: 'Team members', singular: 'team member', icon: 'groups',
    description: 'Staff portraits in the “Meet the team” section.',
    table: 'team_members', titleField: 'name', subtitleField: 'role', imageField: 'image_url', statusField: 'is_published',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true, group: 'Profile' },
      { key: 'role', label: 'Role', type: 'text', required: true, group: 'Profile' },
      { key: 'image_url', label: 'Portrait', type: 'image', group: 'Profile', wide: true },
      { key: 'alt_text', label: 'Portrait description', type: 'text', group: 'Profile', wide: true },
      { key: 'social_media', label: 'Social links', type: 'json', group: 'Profile', wide: true, help: 'JSON, e.g. { "linkedin": "https://…" }' },
      ORDER, PUBLISH,
    ],
  },
  {
    key: 'principles', label: 'Curriculum principles', singular: 'principle', icon: 'lightbulb',
    description: '“The Brainy Way” principles on the Curriculum page.',
    table: 'principles', titleField: 'title', subtitleField: 'body',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, group: 'Principle' },
      { key: 'icon', label: 'Icon', type: 'icon', required: true, group: 'Principle' },
      { key: 'body', label: 'Description', type: 'textarea', required: true, group: 'Principle', wide: true },
      ORDER,
    ],
  },
  {
    key: 'admissions_steps', label: 'Admissions steps', singular: 'step', icon: 'checklist',
    description: 'The “How it works” steps on the Admissions page.',
    table: 'admissions_steps', titleField: 'title', subtitleField: 'body', statusField: 'is_published',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, group: 'Step' },
      { key: 'number', label: 'Number', type: 'text', required: true, placeholder: '01', group: 'Step' },
      { key: 'icon', label: 'Icon', type: 'icon', required: true, group: 'Step' },
      { key: 'body', label: 'Description', type: 'textarea', required: true, group: 'Step', wide: true },
      ORDER, PUBLISH,
    ],
  },
]

function galleryFields(): CmsField[] {
  return [
    { key: 'image_url', label: 'Photo', type: 'image', required: true, group: 'Photo', wide: true },
    { key: 'caption', label: 'Caption', type: 'text', group: 'Photo' },
    { key: 'alt_text', label: 'Photo description', type: 'text', group: 'Photo' },
    { key: 'row_index', label: 'Grid row', type: 'number', group: 'Layout' },
    { key: 'column_index', label: 'Grid column', type: 'number', group: 'Layout' },
    ORDER, PUBLISH,
  ]
}

export function getCollection(key: string) {
  return collections.find((item) => item.key === key)
}

// ── Page sections ──────────────────────────────────────────────────────────

export const SECTION_RESOURCE: CmsResource = {
  key: 'page_sections', label: 'Page sections', singular: 'section', icon: 'view_agenda',
  description: 'Headings, text, images and buttons for each part of a page.',
  table: 'page_sections', titleField: 'heading', imageField: 'image_url', statusField: 'is_published',
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text', group: 'Text', help: 'Small label above the heading.' },
    { key: 'heading', label: 'Heading', type: 'text', group: 'Text', wide: true },
    { key: 'body', label: 'Body text', type: 'textarea', group: 'Text', wide: true },
    { key: 'secondary_body', label: 'Second paragraph', type: 'textarea', group: 'Text', wide: true },
    { key: 'image_url', label: 'Image', type: 'image', group: 'Image', wide: true },
    { key: 'cta_label', label: 'Button label', type: 'text', group: 'Button' },
    { key: 'cta_href', label: 'Button link', type: 'text', placeholder: '/admissions', group: 'Button' },
    ORDER, PUBLISH,
  ],
}

type SectionDef = {
  key: string
  label: string
  description: string
  /** Section fields the public page actually renders. */
  fields: string[]
  /** Collections whose items appear inside this section. */
  collections?: string[]
}

export type PageDef = {
  key: string
  label: string
  path: string
  icon: string
  description: string
  cover: string
  sections: SectionDef[]
}

const TEXT = ['eyebrow', 'heading', 'body']
const CTA = ['eyebrow', 'heading', 'body', 'cta_label', 'cta_href']

export const pages: PageDef[] = [
  {
    key: 'home', label: 'Home', path: '/', icon: 'home', cover: '/images/school-building.jpeg',
    description: 'The first impression: slideshow, philosophy, programs, campus life and parent stories.',
    sections: [
      { key: 'hero', label: 'Hero', description: 'Headline over the photo slideshow.', fields: CTA, collections: ['hero_slides'] },
      { key: 'mission', label: 'Philosophy', description: 'The mission statement beneath the hero.', fields: TEXT },
      { key: 'programs', label: 'Programs', description: 'Intro to the programme cards.', fields: ['eyebrow', 'heading'], collections: ['programs'] },
      { key: 'gallery', label: 'Campus life', description: 'Photo grid with a link to more.', fields: ['eyebrow', 'heading', 'cta_label', 'cta_href'], collections: ['gallery_home'] },
      { key: 'testimonials', label: 'Testimonials', description: 'What parents say.', fields: ['eyebrow', 'heading'], collections: ['testimonials'] },
      { key: 'cta', label: 'Admissions banner', description: 'Closing call to action.', fields: CTA },
    ],
  },
  {
    key: 'about', label: 'About', path: '/about', icon: 'info', cover: '/images/students-large-group-photo.jpeg',
    description: 'The school’s story, values, people and campus.',
    sections: [
      { key: 'hero', label: 'Hero', description: 'Headline with background photo.', fields: [...CTA, 'image_url'] },
      { key: 'story', label: 'Our story', description: 'Two paragraphs and a photo.', fields: ['eyebrow', 'heading', 'body', 'secondary_body', 'image_url'] },
      { key: 'values', label: 'Values', description: 'What we stand for.', fields: ['eyebrow', 'heading'], collections: ['values'] },
      { key: 'gallery', label: 'Campus life', description: 'Photo grid.', fields: ['eyebrow', 'heading'], collections: ['gallery_about'] },
      { key: 'team', label: 'Team', description: 'Meet the team.', fields: ['eyebrow', 'heading'], collections: ['team_members'] },
      { key: 'cta', label: 'Admissions banner', description: 'Closing call to action.', fields: CTA },
    ],
  },
  {
    key: 'curriculum', label: 'Curriculum', path: '/curriculum', icon: 'menu_book', cover: '/images/students-classroom-primary.jpeg',
    description: 'Teaching principles and the detailed programme journey.',
    sections: [
      { key: 'hero', label: 'Hero', description: 'Headline with background photo.', fields: [...TEXT, 'image_url'] },
      { key: 'principles', label: 'Principles', description: 'The Brainy Way.', fields: TEXT, collections: ['principles'] },
      { key: 'quote', label: 'Quote', description: 'Feature quote with photo.', fields: [...TEXT, 'image_url'] },
      { key: 'programs', label: 'Programs', description: 'Detailed programme timeline.', fields: ['eyebrow', 'heading'], collections: ['programs'] },
      { key: 'cta', label: 'Admissions banner', description: 'Closing call to action.', fields: CTA },
    ],
  },
  {
    key: 'admissions', label: 'Admissions', path: '/admissions', icon: 'how_to_reg', cover: '/images/student-uniform-portrait.jpeg',
    description: 'How families apply, plus the inquiry form.',
    sections: [
      { key: 'hero', label: 'Hero', description: 'Headline with photo.', fields: [...TEXT, 'image_url'] },
      { key: 'steps', label: 'Steps', description: 'How it works.', fields: ['eyebrow', 'heading'], collections: ['admissions_steps'] },
    ],
  },
]

export function getPage(key: string) {
  return pages.find((page) => page.key === key)
}

/** A section resource narrowed to the fields the page actually renders. */
export function sectionResource(def: SectionDef): CmsResource {
  return {
    ...SECTION_RESOURCE,
    singular: `${def.label} section`,
    fields: SECTION_RESOURCE.fields.filter((field) => def.fields.includes(field.key) || field.group === 'Publishing'),
  }
}

// ── Settings & inquiries ────────────────────────────────────────────────────

export const SETTINGS_RESOURCE: CmsResource = {
  key: 'site_settings', label: 'Site settings', singular: 'settings', icon: 'tune',
  description: 'Contact details shown in the footer and on the Admissions page.',
  table: 'site_settings', titleField: 'email',
  fields: [
    { key: 'phone', label: 'Phone', type: 'text', group: 'Contact' },
    { key: 'email', label: 'Email', type: 'text', group: 'Contact' },
    { key: 'address', label: 'Address', type: 'textarea', group: 'Contact', wide: true },
    { key: 'hours', label: 'Opening hours', type: 'text', group: 'Contact', wide: true },
    { key: 'copyright_year', label: 'Copyright year', type: 'number', group: 'Footer' },
    { key: 'privacy_policy_link', label: 'Privacy policy link', type: 'text', group: 'Footer' },
  ],
}

export const MEDIA_BUCKET = 'cms-media'
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export const ICON_SUGGESTIONS = [
  'school', 'child_care', 'menu_book', 'auto_stories', 'psychology', 'science', 'palette', 'music_note',
  'sports_soccer', 'diversity_3', 'favorite', 'emoji_events', 'workspace_premium', 'lightbulb', 'explore',
  'eco', 'groups', 'self_improvement', 'edit_note', 'fact_check', 'assignment', 'verified', 'handshake', 'star',
]

// ── Form helpers ────────────────────────────────────────────────────────────

export function initialValues(resource: CmsResource, record?: CmsRecord): CmsRecord {
  return Object.fromEntries(resource.fields.map((field) => {
    const value = record?.[field.key]
    if (field.type === 'boolean') return [field.key, value ?? true]
    if (field.type === 'number') return [field.key, value ?? 0]
    if (field.type === 'list') return [field.key, Array.isArray(value) ? value.join('\n') : '']
    if (field.type === 'json') return [field.key, JSON.stringify(value ?? {}, null, 2)]
    if (field.type === 'select') return [field.key, value ?? field.options?.[0]?.value ?? '']
    return [field.key, value ?? '']
  }))
}

export function toPayload(resource: CmsResource, values: CmsRecord): CmsRecord {
  const payload = Object.fromEntries(resource.fields.map((field) => {
    const value = values[field.key]
    if (field.type === 'number') return [field.key, value === '' || value === null ? 0 : Number(value)]
    if (field.type === 'list') return [field.key, String(value ?? '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean)]
    if (field.type === 'json') {
      try {
        return [field.key, value ? JSON.parse(value) : {}]
      } catch {
        throw new Error(`${field.label} must be valid JSON.`)
      }
    }
    if (field.type === 'date' && !value) return [field.key, null]
    return [field.key, value]
  }))
  return { ...payload, ...resource.scope }
}

export function fileNamePart(name: string) {
  return name.normalize('NFKD').replace(/[^a-zA-Z0-9.-]+/g, '-').replace(/^-+|-+$/g, '').slice(-100) || 'image'
}

export function formatBytes(bytes?: number | null) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function timeAgo(date?: string | null) {
  if (!date) return ''
  const seconds = Math.round((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const units: [number, string][] = [[60, 'minute'], [24, 'hour'], [7, 'day'], [4.35, 'week'], [12, 'month'], [Infinity, 'year']]
  let value = seconds / 60
  for (const [size, unit] of units) {
    if (value < size) {
      const rounded = Math.floor(value)
      return `${rounded} ${unit}${rounded === 1 ? '' : 's'} ago`
    }
    value /= size
  }
  return ''
}
