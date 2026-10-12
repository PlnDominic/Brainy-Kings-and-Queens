'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useSupabase } from '@/lib/supabase-context'
import { CmsField, CmsRecord, CmsResource, ICON_SUGGESTIONS, initialValues, toPayload } from './config'
import { MediaPicker } from './media'
import { Btn, FieldShell, Icon, Toggle, cx, inputClass, useFeedback } from './ui'

type Props = {
  resource: CmsResource
  /** Existing record to edit; `null` creates a new one. */
  record: CmsRecord | null
  open: boolean
  title?: string
  subtitle?: string
  /** Extra values merged into the insert payload (e.g. page/section keys). */
  createDefaults?: CmsRecord
  onClose: () => void
  onSaved: () => void
}

export default function RecordEditor({ resource, record, open, title, subtitle, createDefaults, onClose, onSaved }: Props) {
  const supabase = useSupabase()
  const { toast, confirm } = useFeedback()
  const [values, setValues] = useState<CmsRecord>({})
  const [initial, setInitial] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [pickerFor, setPickerFor] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    if (!open) return
    const next = initialValues(resource, record || createDefaults)
    setValues(next)
    setInitial(JSON.stringify(next))
    setError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, record, resource])

  const dirty = open && JSON.stringify(values) !== initial

  async function requestClose() {
    if (saving) return
    if (dirty && !(await confirm({ title: 'Discard unsaved changes?', body: 'Your edits to this item will be lost.', confirmLabel: 'Discard' }))) return
    onClose()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !pickerFor) void requestClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const groups = useMemo(() => {
    const map = new Map<string, CmsField[]>()
    resource.fields.filter((field) => !field.advanced).forEach((field) => {
      const name = field.group || 'Details'
      map.set(name, [...(map.get(name) || []), field])
    })
    return Array.from(map.entries())
  }, [resource])
  const advancedFields = resource.fields.filter((field) => field.advanced)

  if (!open) return null

  const set = (key: string, value: unknown) => setValues((current) => ({ ...current, [key]: value }))

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = toPayload(resource, values)
      const query = supabase.from(resource.table as any)
      const result = record?.id
        ? await query.update(payload).eq('id', record.id)
        : await query.insert({ ...createDefaults, ...payload })
      if (result.error) throw new Error(result.error.message)
      toast(record?.id ? 'Changes saved. The website is updated' : `New ${resource.singular} created`)
      onSaved()
      onClose()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save.')
    } finally {
      setSaving(false)
    }
  }

  const isSection = resource.key === 'page_sections'

  return (
    <div className="fixed inset-0 z-[120] flex justify-end bg-[#1F0808]/40 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) void requestClose() }}>
      <form
        onSubmit={handleSave}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cms-editor-title"
        className="flex h-full w-full max-w-2xl flex-col bg-[#FCF9F9] shadow-2xl animate-[cms-drawer_.25s_cubic-bezier(.2,.8,.2,1)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-[#F1E6E6] bg-white px-6 py-5">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              <Icon name={resource.icon} className="text-[16px]" />
              {subtitle || resource.label}
            </div>
            <h2 id="cms-editor-title" className="truncate text-xl font-extrabold text-[#1F0808]">
              {title || (record ? `Edit ${resource.singular}` : `New ${resource.singular}`)}
            </h2>
          </div>
          <Btn variant="ghost" icon="close" aria-label="Close editor" onClick={() => void requestClose()} />
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {isSection && <SectionPreview values={values} />}

          {groups.map(([group, fields]) => (
            <section key={group} className="rounded-2xl border border-[#EFE3E3] bg-white p-5">
              <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#8C6F6F]">{group}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <FieldInput
                    key={field.key}
                    field={field}
                    value={values[field.key]}
                    onChange={(value) => set(field.key, value)}
                    onPickImage={() => setPickerFor(field.key)}
                  />
                ))}
              </div>
            </section>
          ))}

          {advancedFields.length > 0 && (
            <section className="rounded-2xl border border-[#EFE3E3] bg-white">
              <button
                type="button"
                aria-expanded={showAdvanced}
                onClick={() => setShowAdvanced((value) => !value)}
                className="flex w-full items-center justify-between px-5 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#8C6F6F] hover:text-[#1F0808]"
              >
                More options
                <Icon name="expand_more" className={cx('text-[20px] transition-transform', showAdvanced && 'rotate-180')} />
              </button>
              {showAdvanced && (
                <div className="grid grid-cols-1 gap-4 px-5 pb-5 sm:grid-cols-2">
                  {advancedFields.map((field) => (
                    <FieldInput key={field.key} field={field} value={values[field.key]} onChange={(value) => set(field.key, value)} onPickImage={() => setPickerFor(field.key)} />
                  ))}
                </div>
              )}
            </section>
          )}

          {error && (
            <div role="alert" className="flex items-start gap-2 rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-sm text-[#B42318]">
              <Icon name="error" filled className="text-[18px]" />
              {error}
            </div>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-[#F1E6E6] bg-white px-6 py-4">
          <span className="text-xs text-[#8C6F6F]">{dirty ? 'Unsaved changes' : 'No changes yet'}</span>
          <div className="flex gap-2">
            <Btn onClick={() => void requestClose()} disabled={saving}>Cancel</Btn>
            <Btn type="submit" variant="primary" icon="check" loading={saving}>
              {record ? 'Save changes' : `Create ${resource.singular}`}
            </Btn>
          </div>
        </footer>
      </form>

      <MediaPicker
        open={pickerFor !== null}
        onClose={() => setPickerFor(null)}
        onSelect={(url) => {
          if (pickerFor) set(pickerFor, url)
          setPickerFor(null)
        }}
      />
    </div>
  )
}

function FieldInput({ field, value, onChange, onPickImage }: {
  field: CmsField; value: any; onChange: (value: any) => void; onPickImage: () => void
}) {
  const id = `field-${field.key}`
  const wide = field.wide || field.type === 'image' || field.type === 'textarea' || field.type === 'list' || field.type === 'json'

  if (field.type === 'boolean') {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl bg-[#FBF6F6] px-4 py-3 sm:col-span-2">
        <div>
          <div className="text-[13px] font-semibold text-on-surface">{field.label}</div>
          <div className="text-xs text-[#8C6F6F]">{value ? 'Visitors can see this on the website.' : 'Hidden from visitors until you switch it on.'}</div>
        </div>
        <Toggle checked={Boolean(value)} onChange={onChange} label={field.label} />
      </div>
    )
  }

  if (field.type === 'image') {
    return (
      <FieldShell label={field.label} required={field.required} help={field.help} className="sm:col-span-2" htmlFor={id}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <button
            type="button"
            onClick={onPickImage}
            className="group relative flex aspect-[16/10] w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#EADADA] bg-[#FBF6F6] sm:w-56"
          >
            {value ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} alt="" className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  <Icon name="swap_horiz" className="mr-1 text-[18px]" /> Replace
                </span>
              </>
            ) : (
              <span className="flex flex-col items-center gap-1 text-[#A88B8B]">
                <Icon name="add_photo_alternate" className="text-[32px]" />
                <span className="text-xs font-semibold">Choose image</span>
              </span>
            )}
          </button>
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
            <input
              id={id}
              type="text"
              inputMode="url"
              value={value || ''}
              required={field.required}
              onChange={(event) => onChange(event.target.value)}
              className={cx(inputClass, 'font-mono text-xs')}
              placeholder="Image link, or choose from the library"
            />
            <div className="flex gap-2">
              <Btn size="sm" icon="photo_library" onClick={onPickImage}>Library</Btn>
              {value && <Btn size="sm" variant="ghost" icon="close" onClick={() => onChange('')}>Remove</Btn>}
            </div>
          </div>
        </div>
      </FieldShell>
    )
  }

  if (field.type === 'icon') {
    return (
      <FieldShell label={field.label} required={field.required} help={field.help} htmlFor={id}>
        <div className="flex gap-2">
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-[#FBEAEA] text-primary">
            <Icon name={value || 'help'} className="text-[22px]" />
          </div>
          <input id={id} list="cms-icon-suggestions" value={value || ''} required={field.required} onChange={(event) => onChange(event.target.value)} className={inputClass} placeholder="e.g. school" />
          <datalist id="cms-icon-suggestions">
            {ICON_SUGGESTIONS.map((icon) => <option key={icon} value={icon} />)}
          </datalist>
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {ICON_SUGGESTIONS.slice(0, 12).map((icon) => (
            <button
              key={icon}
              type="button"
              title={icon}
              onClick={() => onChange(icon)}
              className={cx('flex h-7 w-7 items-center justify-center rounded-md transition', value === icon ? 'bg-primary text-white' : 'text-[#8C6F6F] hover:bg-[#F6EEEE] hover:text-primary')}
            >
              <Icon name={icon} className="text-[16px]" />
            </button>
          ))}
        </div>
      </FieldShell>
    )
  }

  if (field.type === 'select') {
    return (
      <FieldShell label={field.label} required={field.required} help={field.help} htmlFor={id}>
        <select id={id} value={value || ''} onChange={(event) => onChange(event.target.value)} className={inputClass}>
          {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </FieldShell>
    )
  }

  if (field.type === 'textarea' || field.type === 'list' || field.type === 'json') {
    return (
      <FieldShell label={field.label} required={field.required} help={field.help} className="sm:col-span-2" htmlFor={id}>
        <textarea
          id={id}
          value={value ?? ''}
          required={field.required}
          onChange={(event) => onChange(event.target.value)}
          rows={field.type === 'json' ? 5 : 4}
          className={cx(inputClass, 'resize-y leading-relaxed', field.type === 'json' && 'font-mono text-xs')}
          placeholder={field.type === 'list' ? 'One item per line' : field.placeholder}
        />
      </FieldShell>
    )
  }

  return (
    <FieldShell label={field.label} required={field.required} help={field.help} className={wide ? 'sm:col-span-2' : undefined} htmlFor={id}>
      <input
        id={id}
        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
        value={value ?? ''}
        required={field.required}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
        placeholder={field.placeholder}
      />
    </FieldShell>
  )
}

/** A small rendering of the section in the website's own style. */
function SectionPreview({ values }: { values: CmsRecord }) {
  const hasImage = Boolean(values.image_url)
  return (
    <div className="overflow-hidden rounded-2xl border border-[#EFE3E3] bg-white">
      <div className="flex items-center gap-1.5 border-b border-[#F1E6E6] bg-[#FBF6F6] px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F2B8B5]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F5D9A8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#BDE5C8]" />
        <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A88B8B]">Live preview</span>
      </div>
      <div className={cx('grid gap-5 p-6', hasImage && 'sm:grid-cols-[1fr_180px]')}>
        <div className="min-w-0">
          {values.eyebrow && <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{values.eyebrow}</div>}
          <div className="font-headline-lg text-xl font-extrabold leading-tight text-[#1F0808]">
            {values.heading || <span className="text-[#C9B3B3]">Section heading</span>}
          </div>
          {values.body && <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-[#5C2E2E]">{values.body}</p>}
          {values.secondary_body && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5C2E2E]">{values.secondary_body}</p>}
          {values.cta_label && (
            <span className="mt-4 inline-flex items-center gap-1 bg-primary px-4 py-2 text-xs font-bold text-white">
              {values.cta_label} <Icon name="arrow_forward" className="text-[14px]" />
            </span>
          )}
        </div>
        {hasImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={values.image_url} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
        )}
      </div>
    </div>
  )
}
