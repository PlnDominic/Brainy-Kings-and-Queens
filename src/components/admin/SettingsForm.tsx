'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useSupabase } from '@/lib/supabase-context'
import { CmsRecord, SETTINGS_RESOURCE, initialValues, toPayload } from './config'
import { Btn, Card, FieldShell, Icon, Skeleton, inputClass, useFeedback } from './ui'

export default function SettingsForm() {
  const supabase = useSupabase()
  const { toast } = useFeedback()
  const [record, setRecord] = useState<CmsRecord | null>(null)
  const [values, setValues] = useState<CmsRecord>(initialValues(SETTINGS_RESOURCE))
  const [initial, setInitial] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data, error } = await supabase.from('site_settings').select('*').order('created_at', { ascending: true }).limit(1).maybeSingle()
    setLoading(false)
    if (error) {
      toast(error.message, 'error')
      return
    }
    const next = initialValues(SETTINGS_RESOURCE, data || undefined)
    setRecord(data)
    setValues(next)
    setInitial(JSON.stringify(next))
  }

  useEffect(() => { void load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    const payload = toPayload(SETTINGS_RESOURCE, values)
    const result = record?.id
      ? await supabase.from('site_settings' as any).update(payload).eq('id', record.id)
      : await supabase.from('site_settings' as any).insert(payload)
    setSaving(false)
    if (result.error) {
      toast(result.error.message, 'error')
      return
    }
    toast('Settings saved — footer and contact details updated')
    await load()
  }

  const dirty = JSON.stringify(values) !== initial
  const set = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }))
  const groups = ['Contact', 'Footer']

  if (loading) {
    return <div className="grid gap-6 lg:grid-cols-[1fr_320px]"><Skeleton className="h-96" /><Skeleton className="h-64" /></div>
  }

  return (
    <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        {groups.map((group) => (
          <Card key={group} className="p-6">
            <h2 className="mb-1 text-base font-bold text-[#1F0808]">{group === 'Contact' ? 'Contact details' : 'Footer'}</h2>
            <p className="mb-5 text-[13px] text-[#8C6F6F]">
              {group === 'Contact' ? 'Shown in the footer on every page and beside the admissions form.' : 'Legal details at the very bottom of the website.'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {SETTINGS_RESOURCE.fields.filter((field) => field.group === group).map((field) => (
                <FieldShell key={field.key} label={field.label} htmlFor={`setting-${field.key}`} className={field.wide ? 'sm:col-span-2' : undefined}>
                  {field.type === 'textarea' ? (
                    <textarea id={`setting-${field.key}`} rows={3} value={values[field.key] ?? ''} onChange={(event) => set(field.key, event.target.value)} className={inputClass} />
                  ) : (
                    <input id={`setting-${field.key}`} type={field.type === 'number' ? 'number' : 'text'} value={values[field.key] ?? ''} onChange={(event) => set(field.key, event.target.value)} className={inputClass} />
                  )}
                </FieldShell>
              ))}
            </div>
          </Card>
        ))}
        <div className="sticky bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-[#EFE3E3] bg-white/90 px-5 py-3 shadow-lg shadow-[#2A0C0C]/5 backdrop-blur">
          <span className="text-[13px] text-[#8C6F6F]">{dirty ? 'You have unsaved changes' : 'All changes saved'}</span>
          <Btn type="submit" variant="primary" icon="check" loading={saving} disabled={!dirty}>Save settings</Btn>
        </div>
      </div>

      <aside>
        <div className="sticky top-24 overflow-hidden rounded-2xl bg-[#2A0C0C] text-white shadow-xl">
          <div className="border-b border-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">Footer preview</div>
          <ul className="space-y-4 p-5 text-sm">
            {[['call', values.phone], ['mail', values.email], ['location_on', values.address], ['schedule', values.hours]].map(([icon, value]) => (
              <li key={icon} className="flex items-start gap-3">
                <Icon name={icon} className="mt-0.5 text-[18px] text-[#FF8A8A]" />
                <span className={value ? 'text-white/90' : 'text-white/30'}>{value || 'Not set'}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 px-5 py-3 text-xs text-white/40">
            © {values.copyright_year || new Date().getFullYear()} Brainy Kings &amp; Queens Montessori
          </div>
        </div>
      </aside>
    </form>
  )
}
