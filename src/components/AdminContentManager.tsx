'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/Button'
import { useSupabase } from '@/lib/supabase-context'

type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'list' | 'image' | 'date' | 'json'
type CmsField = { key: string; label: string; type: FieldType; required?: boolean; placeholder?: string }
type CmsResource = {
  key: string
  label: string
  table: string
  titleField: string
  statusField?: string
  orderField?: string
  orderDescending?: boolean
  single?: boolean
  fields: CmsField[]
}
type CmsRecord = Record<string, any>

const resources: CmsResource[] = [
  { key: 'page_sections', label: 'Page sections', table: 'page_sections', titleField: 'section_key', statusField: 'is_published', fields: [
    { key: 'page_key', label: 'Page key', type: 'text', required: true }, { key: 'section_key', label: 'Section key', type: 'text', required: true },
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' }, { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'body', label: 'Body', type: 'textarea' }, { key: 'secondary_body', label: 'Secondary body', type: 'textarea' },
    { key: 'image_url', label: 'Image', type: 'image' }, { key: 'cta_label', label: 'Button label', type: 'text' },
    { key: 'cta_href', label: 'Button link', type: 'text' }, { key: 'display_order', label: 'Display order', type: 'number' },
    { key: 'is_published', label: 'Published', type: 'boolean' },
  ] },
  { key: 'hero_slides', label: 'Homepage slides', table: 'hero_slides', titleField: 'title', statusField: 'is_active', fields: [
    { key: 'title', label: 'Slide title', type: 'text', required: true }, { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'image_url', label: 'Image', type: 'image', required: true }, { key: 'alt_text', label: 'Image description', type: 'text', required: true },
    { key: 'link', label: 'Link', type: 'text', placeholder: '/admissions' }, { key: 'display_order', label: 'Display order', type: 'number' },
    { key: 'is_active', label: 'Published', type: 'boolean' },
  ] },
  { key: 'programs', label: 'Academic programs', table: 'programs', titleField: 'level', statusField: 'is_published', fields: [
    { key: 'number', label: 'Number', type: 'text', required: true }, { key: 'level', label: 'Program name', type: 'text', required: true },
    { key: 'age_range', label: 'Age range', type: 'text', required: true }, { key: 'tagline', label: 'Tagline', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true }, { key: 'features', label: 'Features (one per line)', type: 'list' },
    { key: 'icon', label: 'Material icon name', type: 'text', required: true }, { key: 'image_url', label: 'Image', type: 'image', required: true },
    { key: 'border_color', label: 'Border class', type: 'text' }, { key: 'accent_text_color', label: 'Accent text class', type: 'text' },
    { key: 'display_order', label: 'Display order', type: 'number' }, { key: 'is_published', label: 'Published', type: 'boolean' },
  ] },
  { key: 'values', label: 'School values', table: 'values', titleField: 'title', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true }, { key: 'body', label: 'Description', type: 'textarea', required: true },
    { key: 'icon', label: 'Material icon name', type: 'text', required: true }, { key: 'display_order', label: 'Display order', type: 'number' },
  ] },
  { key: 'principles', label: 'Curriculum principles', table: 'principles', titleField: 'title', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true }, { key: 'body', label: 'Description', type: 'textarea', required: true },
    { key: 'icon', label: 'Material icon name', type: 'text', required: true }, { key: 'display_order', label: 'Display order', type: 'number' },
  ] },
  { key: 'testimonials', label: 'Testimonials', table: 'testimonials', titleField: 'name', statusField: 'is_published', fields: [
    { key: 'quote', label: 'Quote', type: 'textarea', required: true }, { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text', required: true }, { key: 'display_order', label: 'Display order', type: 'number' },
    { key: 'is_published', label: 'Published', type: 'boolean' },
  ] },
  { key: 'gallery_items', label: 'Gallery', table: 'gallery_items', titleField: 'caption', statusField: 'is_published', fields: [
    { key: 'page_key', label: 'Show on page', type: 'text', required: true }, { key: 'caption', label: 'Caption', type: 'text' },
    { key: 'alt_text', label: 'Image description', type: 'text' },
    { key: 'image_url', label: 'Image', type: 'image', required: true }, { key: 'row_index', label: 'Gallery row', type: 'number' },
    { key: 'column_index', label: 'Column', type: 'number' }, { key: 'display_order', label: 'Display order', type: 'number' },
    { key: 'is_published', label: 'Published', type: 'boolean' },
  ] },
  { key: 'admissions_steps', label: 'Admissions steps', table: 'admissions_steps', titleField: 'title', statusField: 'is_published', fields: [
    { key: 'number', label: 'Number', type: 'text', required: true }, { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'body', label: 'Description', type: 'textarea', required: true }, { key: 'icon', label: 'Material icon name', type: 'text', required: true },
    { key: 'display_order', label: 'Display order', type: 'number' }, { key: 'is_published', label: 'Published', type: 'boolean' },
  ] },
  { key: 'team_members', label: 'Team members', table: 'team_members', titleField: 'name', statusField: 'is_published', fields: [
    { key: 'name', label: 'Name', type: 'text', required: true }, { key: 'role', label: 'Role', type: 'text', required: true },
    { key: 'image_url', label: 'Portrait', type: 'image' }, { key: 'alt_text', label: 'Image description', type: 'text' },
    { key: 'social_media', label: 'Social links (JSON)', type: 'json' }, { key: 'display_order', label: 'Display order', type: 'number' },
    { key: 'is_published', label: 'Published', type: 'boolean' },
  ] },
  { key: 'admissions_inquiries', label: 'Admissions inquiries', table: 'admissions_inquiries', titleField: 'parent_name', orderField: 'created_at', orderDescending: true, fields: [
    { key: 'parent_name', label: 'Parent name', type: 'text', required: true }, { key: 'phone', label: 'Phone', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'text', required: true }, { key: 'child_age', label: 'Child age', type: 'text', required: true },
    { key: 'preferred_start_date', label: 'Preferred start date', type: 'date' }, { key: 'referral_source', label: 'Referral source', type: 'text' },
  ] },
  { key: 'site_settings', label: 'Contact and site settings', table: 'site_settings', titleField: 'email', single: true, fields: [
    { key: 'phone', label: 'Phone', type: 'text' }, { key: 'email', label: 'Email', type: 'text' },
    { key: 'address', label: 'Address', type: 'textarea' }, { key: 'hours', label: 'Business hours', type: 'text' },
    { key: 'copyright_year', label: 'Copyright year', type: 'number' }, { key: 'privacy_policy_link', label: 'Privacy policy URL', type: 'text' },
  ] },
]

const MEDIA_BUCKET = 'cms-media'
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

function initialValues(resource: CmsResource, record?: CmsRecord): CmsRecord {
  return Object.fromEntries(resource.fields.map((field) => {
    const value = record?.[field.key]
    if (field.type === 'boolean') return [field.key, value ?? (field.key === resource.statusField)]
    if (field.type === 'number') return [field.key, value ?? 0]
    if (field.type === 'list') return [field.key, Array.isArray(value) ? value.join('\n') : '']
    if (field.type === 'json') return [field.key, JSON.stringify(value ?? {}, null, 2)]
    if (resource.key === 'gallery_items' && field.key === 'page_key') return [field.key, value ?? 'home']
    return [field.key, value ?? '']
  }))
}

function toPayload(resource: CmsResource, values: CmsRecord): CmsRecord {
  return Object.fromEntries(resource.fields.map((field) => {
    const value = values[field.key]
    if (field.type === 'number') return [field.key, value === '' ? 0 : Number(value)]
    if (field.type === 'list') return [field.key, String(value).split(/\r?\n/).map((line) => line.trim()).filter(Boolean)]
    if (field.type === 'json') return [field.key, value ? JSON.parse(value) : {}]
    if (field.type === 'date' && !value) return [field.key, null]
    return [field.key, value]
  }))
}

function fileNamePart(name: string) {
  return name.normalize('NFKD').replace(/[^a-zA-Z0-9.-]+/g, '-').replace(/^-+|-+$/g, '').slice(-100) || 'image'
}

export default function AdminContentManager() {
  const supabase = useSupabase()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'content'
  const requestedResourceKey = searchParams.get('type') || 'programs'
  const resourceKey = tab === 'settings' ? 'site_settings' : tab === 'inquiries' ? 'admissions_inquiries' : requestedResourceKey
  const resource = resources.find((item) => item.key === resourceKey) || resources[1]
  const [records, setRecords] = useState<CmsRecord[]>([])
  const [media, setMedia] = useState<CmsRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [selected, setSelected] = useState<CmsRecord | null>(null)
  const [values, setValues] = useState<CmsRecord>({})
  const [isCreating, setIsCreating] = useState(false)

  async function loadRecords() {
    setLoading(true)
    setError('')
    const query = supabase.from((tab === 'media' ? 'media_library' : resource.table) as any).select('*')
    const orderedQuery = tab === 'media'
      ? query.order('created_at', { ascending: false })
      : query.order(resource.orderField || 'display_order', { ascending: !resource.orderDescending })
    const { data, error: queryError } = resource.single && tab !== 'media'
      ? await supabase.from(resource.table as any).select('*').limit(1)
      : await orderedQuery
    if (queryError) {
      setError(queryError.message)
      setRecords([])
      setMedia([])
    } else if (tab === 'media') {
      setMedia(data || [])
    } else {
      setRecords(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    void loadRecords()
  }, [tab, resourceKey])

  async function uploadImage(file: File): Promise<string> {
    if (!ACCEPTED_IMAGE_TYPES.has(file.type)) throw new Error('Choose a JPEG, PNG, WebP, or GIF image.')
    if (file.size > MAX_UPLOAD_BYTES) throw new Error('Images must be 5 MB or smaller.')
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw new Error('Your admin session has expired. Sign in again.')

    const path = `${user.id}/${crypto.randomUUID()}-${fileNamePart(file.name)}`
    const { data: uploaded, error: uploadError } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    })
    if (uploadError) throw new Error(uploadError.message)

    const { error: metadataError } = await supabase.from('media_library').insert({
      file_path: uploaded.path,
      original_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      uploaded_by: user.id,
    })
    if (metadataError) {
      await supabase.storage.from(MEDIA_BUCKET).remove([uploaded.path])
      throw new Error(metadataError.message)
    }

    return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(uploaded.path).data.publicUrl
  }

  async function handleFieldUpload(fieldKey: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadImage(file)
      setValues((current) => ({ ...current, [fieldKey]: url }))
      setNotice('Image uploaded. Save the record to apply it.')
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  async function handleMediaUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setUploading(true)
    setError('')
    setNotice('')
    try {
      await uploadImage(file)
      setNotice('Image uploaded to the media library.')
      await loadRecords()
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  function beginCreate() {
    setSelected(null)
    setValues(initialValues(resource))
    setIsCreating(true)
    setError('')
    setNotice('')
  }

  function beginEdit(record: CmsRecord) {
    setSelected(record)
    setValues(initialValues(resource, record))
    setIsCreating(false)
    setError('')
    setNotice('')
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setNotice('')
    try {
      const payload = toPayload(resource, values)
      const query = supabase.from(resource.table as any)
      const result = isCreating || !selected?.id
        ? await query.insert(payload)
        : await query.update(payload).eq('id', selected.id)
      if (result.error) throw new Error(result.error.message)
      setSelected(null)
      setIsCreating(false)
      setNotice('Changes saved.')
      await loadRecords()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save this record.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(record: CmsRecord) {
    const label = record[resource.titleField] || 'this record'
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return
    setError('')
    setNotice('')
    const { error: deleteError } = await supabase.from(resource.table as any).delete().eq('id', record.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    setNotice('Record deleted.')
    await loadRecords()
  }

  async function handleDeleteMedia(record: CmsRecord) {
    if (!window.confirm(`Delete ${record.original_name || 'this file'}? This cannot be undone.`)) return
    setError('')
    const { error: storageError } = await supabase.storage.from(MEDIA_BUCKET).remove([record.file_path])
    if (storageError) {
      setError(storageError.message)
      return
    }
    const { error: rowError } = await supabase.from('media_library').delete().eq('id', record.id)
    if (rowError) {
      setError(rowError.message)
      return
    }
    setNotice('Media file deleted.')
    await loadRecords()
  }

  async function togglePublished(record: CmsRecord) {
    if (!resource.statusField) return
    const field = resource.statusField
    const { error: updateError } = await supabase.from(resource.table as any)
      .update({ [field]: !record[field] }).eq('id', record.id)
    if (updateError) {
      setError(updateError.message)
      return
    }
    await loadRecords()
  }

  const mediaUrl = (path: string) => path.startsWith('http')
    ? path
    : supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl

  const showEditor = isCreating || selected !== null
  const recordTitle = (record: CmsRecord) => resource.key === 'page_sections'
    ? `${record.page_key || 'Page'} · ${record.section_key || 'Section'}`
    : record[resource.titleField] || record.id

  return (
    <div className="min-w-0">
      <header className="mb-lg flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-label-sm font-bold uppercase tracking-[0.2em] text-secondary">Content studio</p>
          <h1 className="mt-xs text-headline-lg font-headline-lg text-on-surface">
            {tab === 'media' ? 'Media library' : tab === 'settings' ? 'Site settings' : 'Manage content'}
          </h1>
        </div>
        {tab === 'content' && (
          <Button type="button" onClick={beginCreate}>
            <span className="material-symbols-outlined mr-sm text-[18px]">add</span>
            Add {resource.label.toLowerCase()}
          </Button>
        )}
        {tab === 'media' && (
          <label className="inline-flex cursor-pointer items-center justify-center gap-sm bg-primary px-lg py-md font-medium text-on-primary hover:bg-primary/90">
            <span className="material-symbols-outlined text-[18px]">upload</span>
            {uploading ? 'Uploading...' : 'Upload image'}
            <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading} onChange={handleMediaUpload} />
          </label>
        )}
      </header>

      {tab === 'content' && (
        <label className="mb-md flex max-w-xl flex-col gap-xs text-label-sm font-bold text-on-surface-variant">
          Content type
          <select
            value={resource.key}
            onChange={(event) => { window.location.href = `/admin/content?type=${event.target.value}` }}
            className="w-full border border-outline-variant bg-surface-container-lowest px-md py-sm text-body-md font-normal text-on-surface"
          >
            {resources.filter((item) => !item.single && item.key !== 'admissions_inquiries').map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
          </select>
        </label>
      )}

      {resource.single && records.length === 0 && !loading && (
        <Button type="button" onClick={beginCreate} className="mb-md">Add site settings</Button>
      )}

      {error && <p role="alert" className="mb-md border border-error/30 bg-error-container px-md py-sm text-on-error-container">{error}</p>}
      {notice && <p role="status" className="mb-md border border-green-700/20 bg-green-50 px-md py-sm text-green-900">{notice}</p>}

      {tab === 'media' ? (
        loading ? <p className="py-xl text-on-surface-variant">Loading media...</p> : media.length === 0 ? (
          <p className="border border-outline-variant bg-surface-container-lowest p-lg text-on-surface-variant">No uploaded images yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-md sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {media.map((item) => (
              <article key={item.id} className="overflow-hidden border border-outline-variant bg-surface-container-lowest">
                <img src={mediaUrl(item.file_path)} alt={item.original_name || 'Uploaded image'} className="aspect-square w-full object-cover" />
                <div className="flex items-center justify-between gap-sm p-sm">
                  <span className="truncate text-label-sm text-on-surface">{item.original_name}</span>
                  <Button type="button" variant="destructive" size="sm" aria-label={`Delete ${item.original_name}`} onClick={() => handleDeleteMedia(item)}>
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )
      ) : (
        <>
          {loading ? <p className="py-xl text-on-surface-variant">Loading {resource.label.toLowerCase()}...</p> : records.length === 0 ? (
            <p className="border border-outline-variant bg-surface-container-lowest p-lg text-on-surface-variant">No {resource.label.toLowerCase()} found. Add the first one to get started.</p>
          ) : (
            <div className="overflow-x-auto border border-outline-variant bg-surface-container-lowest">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead className="bg-surface-container-low text-label-sm text-on-surface-variant">
                  <tr>
                    <th className="px-md py-sm">Name</th>
                    <th className="px-md py-sm">Status</th>
                    <th className="px-md py-sm">Order</th>
                    <th className="px-md py-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="border-t border-outline-variant/60">
                      <td className="max-w-[360px] truncate px-md py-sm text-label-lg text-on-surface">
                        {recordTitle(record)}
                      </td>
                      <td className="px-md py-sm">
                        {resource.statusField ? (
                          <button type="button" onClick={() => togglePublished(record)} className={`border px-sm py-xs text-label-sm ${record[resource.statusField] ? 'border-green-700/30 text-green-800' : 'border-outline-variant text-on-surface-variant'}`}>
                            {record[resource.statusField] ? 'Published' : 'Draft'}
                          </button>
                        ) : <span className="text-label-sm text-on-surface-variant">Active</span>}
                      </td>
                      <td className="px-md py-sm text-label-sm text-on-surface-variant">{record[resource.orderField || 'display_order'] ?? '-'}</td>
                      <td className="px-md py-sm">
                        <div className="flex justify-end gap-xs">
                          <Button type="button" variant="outline" size="sm" onClick={() => beginEdit(record)} aria-label={`Edit ${recordTitle(record)}`}>
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </Button>
                          {!resource.single && <Button type="button" variant="destructive" size="sm" onClick={() => handleDelete(record)} aria-label={`Delete ${recordTitle(record)}`}>
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </Button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {showEditor && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-md" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) { setSelected(null); setIsCreating(false) } }}>
          <section role="dialog" aria-modal="true" aria-labelledby="cms-editor-title" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-outline-variant bg-surface p-lg shadow-2xl">
            <div className="mb-lg flex items-start justify-between gap-md">
              <div>
                <p className="text-label-sm font-bold uppercase tracking-[0.2em] text-secondary">{resource.label}</p>
                <h2 id="cms-editor-title" className="mt-xs text-headline-md font-headline-md text-on-surface">{isCreating ? 'Create record' : 'Edit record'}</h2>
              </div>
              <Button type="button" variant="outline" size="sm" disabled={saving} onClick={() => { setSelected(null); setIsCreating(false) }} aria-label="Close editor">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </Button>
            </div>
            <form onSubmit={handleSave} className="grid grid-cols-1 gap-md sm:grid-cols-2">
              {resource.fields.map((field) => (
                <label key={field.key} className={`flex flex-col gap-xs text-label-sm font-bold text-on-surface-variant ${field.type === 'textarea' || field.type === 'list' || field.type === 'json' || field.type === 'image' ? 'sm:col-span-2' : ''}`}>
                  {field.type === 'boolean' ? (
                    <span className="flex items-center gap-sm">
                      <input type="checkbox" checked={Boolean(values[field.key])} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.checked }))} className="h-4 w-4 accent-primary" />
                      {field.label}
                    </span>
                  ) : resource.key === 'gallery_items' && field.key === 'page_key' ? (
                    <>
                      {field.label}
                      <select
                        value={values[field.key] || 'home'}
                        required
                        onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                        className="w-full border border-outline-variant bg-surface-container-lowest px-md py-sm font-normal text-on-surface"
                      >
                        <option value="home">Home page</option>
                        <option value="about">About page</option>
                      </select>
                    </>
                  ) : field.type === 'image' ? (
                    <>
                      {field.label}
                      {values[field.key] && <img src={values[field.key]} alt="Selected upload preview" className="mb-xs max-h-48 w-fit max-w-full object-contain" />}
                      <input type="url" value={values[field.key] || ''} required={field.required} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} className="w-full border border-outline-variant bg-surface-container-lowest px-md py-sm font-normal text-on-surface" placeholder="https://..." />
                      <span className="flex flex-wrap items-center gap-sm font-normal">
                        <span>or upload JPEG, PNG, WebP, or GIF (max 5 MB)</span>
                        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading} onChange={(event) => { void handleFieldUpload(field.key, event) }} />
                      </span>
                    </>
                  ) : field.type === 'textarea' || field.type === 'list' || field.type === 'json' ? (
                    <>
                      {field.label}
                      <textarea value={values[field.key] ?? ''} required={field.required} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} className="min-h-28 w-full border border-outline-variant bg-surface-container-lowest px-md py-sm font-normal text-on-surface" placeholder={field.type === 'list' ? 'One item per line' : field.type === 'json' ? '{\n  "instagram": "https://..."\n}' : ''} />
                    </>
                  ) : (
                    <>
                      {field.label}
                      <input type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'} value={values[field.key] ?? ''} required={field.required} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} className="w-full border border-outline-variant bg-surface-container-lowest px-md py-sm font-normal text-on-surface" placeholder={field.placeholder} />
                    </>
                  )}
                </label>
              ))}
              {error && <p role="alert" className="sm:col-span-2 border border-error/30 bg-error-container px-md py-sm text-on-error-container">{error}</p>}
              <div className="flex justify-end gap-sm border-t border-outline-variant pt-md sm:col-span-2">
                <Button type="button" variant="outline" disabled={saving} onClick={() => { setSelected(null); setIsCreating(false) }}>Cancel</Button>
                <Button type="submit" disabled={saving || uploading}>{saving ? 'Saving...' : 'Save changes'}</Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}
