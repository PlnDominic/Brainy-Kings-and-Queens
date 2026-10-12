'use client'

import { useEffect, useState } from 'react'
import { CmsRecord, CmsResource, timeAgo } from './config'
import { useCollection } from './CollectionManager'
import { Btn, Card, EmptyState, Icon, SearchInput, Skeleton, cx, useFeedback } from './ui'
import { useSupabase } from '@/lib/supabase-context'

export const INQUIRIES: CmsResource = {
  key: 'admissions_inquiries', label: 'Admissions inquiries', singular: 'inquiry', icon: 'inbox',
  description: 'Submissions from the Admissions page form.',
  table: 'admissions_inquiries', titleField: 'parent_name', orderField: 'created_at', orderDescending: true,
  fields: [
    { key: 'parent_name', label: 'Parent', type: 'text' }, { key: 'email', label: 'Email', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' }, { key: 'child_age', label: 'Child age', type: 'text' },
    { key: 'preferred_start_date', label: 'Preferred start', type: 'date' }, { key: 'referral_source', label: 'Heard about us', type: 'text' },
  ],
}

const NEW_WINDOW_MS = 1000 * 60 * 60 * 48

export function isNewInquiry(record: CmsRecord) {
  return Date.now() - new Date(record.created_at).getTime() < NEW_WINDOW_MS
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || '?'
}

function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return digits.startsWith('0') ? `233${digits.slice(1)}` : digits
}

function exportCsv(records: CmsRecord[]) {
  const columns = ['created_at', ...INQUIRIES.fields.map((field) => field.key)]
  const escape = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`
  const rows = [
    ['Received', ...INQUIRIES.fields.map((field) => field.label)].map(escape).join(','),
    ...records.map((record) => columns.map((column) => escape(record[column])).join(',')),
  ]
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `admissions-inquiries-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
}

export default function InquiriesInbox() {
  const supabase = useSupabase()
  const { toast, confirm } = useFeedback()
  const { records, loading, error, load } = useCollection(INQUIRIES)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const visible = records.filter((record) =>
    INQUIRIES.fields.map((field) => String(record[field.key] ?? '')).join(' ').toLowerCase().includes(query.toLowerCase()))
  const selected = visible.find((record) => record.id === selectedId) || null

  useEffect(() => {
    if (!selectedId && visible[0] && window.matchMedia('(min-width: 1024px)').matches) setSelectedId(visible[0].id)
  }, [visible, selectedId])

  async function remove(record: CmsRecord) {
    const ok = await confirm({ title: `Delete inquiry from ${record.parent_name}?`, body: 'Their contact details will be permanently removed.' })
    if (!ok) return
    const { error: deleteError } = await supabase.from('admissions_inquiries').delete().eq('id', record.id)
    if (deleteError) {
      toast(deleteError.message, 'error')
      return
    }
    toast('Inquiry deleted')
    setSelectedId(null)
    await load()
  }

  const newCount = records.filter(isNewInquiry).length

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#8C6F6F]">
          <b className="text-[#1F0808]">{records.length}</b> total · <b className="text-primary">{newCount}</b> in the last 48 hours
        </p>
        <div className="flex gap-2">
          <SearchInput value={query} onChange={setQuery} placeholder="Search name, email, phone" />
          <Btn icon="download" disabled={!records.length} onClick={() => exportCsv(visible)}>Export</Btn>
        </div>
      </div>

      {error ? (
        <div role="alert" className="rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-sm text-[#B42318]">{error}</div>
      ) : loading ? (
        <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
      ) : visible.length === 0 ? (
        <EmptyState icon="inbox" title={records.length ? 'No matching inquiries' : 'No inquiries yet'} body="When families submit the form on the Admissions page, they appear here." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,380px)_1fr]">
          <Card className="self-start overflow-hidden">
            <ul className="max-h-[70vh] divide-y divide-[#F3E9E9] overflow-y-auto">
              {visible.map((record) => (
                <li key={record.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(record.id)}
                    className={cx('flex w-full items-center gap-3 px-4 py-3 text-left transition', selectedId === record.id ? 'bg-[#FFF1F1]' : 'hover:bg-[#FFFAFA]')}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2A0C0C] text-xs font-bold text-white">{initials(record.parent_name)}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-[#1F0808]">{record.parent_name}</span>
                        {isNewInquiry(record) && <span className="rounded-full bg-primary px-1.5 py-px text-[10px] font-bold uppercase tracking-wide text-white">New</span>}
                      </div>
                      <div className="truncate text-xs text-[#8C6F6F]">Child age {record.child_age} · {record.email}</div>
                    </div>
                    <span className="shrink-0 text-[11px] text-[#A88B8B]">{timeAgo(record.created_at)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          {selected ? (
            <Card className="fixed inset-x-0 bottom-0 z-[90] max-h-[85vh] overflow-y-auto rounded-b-none p-6 shadow-2xl lg:static lg:z-auto lg:max-h-none lg:rounded-2xl lg:shadow-none">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-white">{initials(selected.parent_name)}</div>
                  <div>
                    <h2 className="text-xl font-extrabold text-[#1F0808]">{selected.parent_name}</h2>
                    <p className="text-sm text-[#8C6F6F]">Received {new Date(selected.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  </div>
                </div>
                <Btn variant="ghost" icon="close" aria-label="Close" className="lg:hidden" onClick={() => setSelectedId(null)} />
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                <a href={`mailto:${selected.email}?subject=${encodeURIComponent('Your Brainy Kings & Queens admissions inquiry')}`}><Btn variant="primary" icon="mail">Reply by email</Btn></a>
                <a href={`tel:${selected.phone}`}><Btn icon="call">Call</Btn></a>
                <a href={`https://wa.me/${whatsappNumber(selected.phone)}`} target="_blank" rel="noreferrer"><Btn icon="chat">WhatsApp</Btn></a>
              </div>

              <dl className="grid gap-px overflow-hidden rounded-xl border border-[#F1E6E6] bg-[#F1E6E6] sm:grid-cols-2">
                {[
                  ['mail', 'Email', selected.email],
                  ['call', 'Phone', selected.phone],
                  ['child_care', 'Child’s age', selected.child_age],
                  ['event', 'Preferred start', selected.preferred_start_date ? new Date(selected.preferred_start_date).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Not specified'],
                  ['campaign', 'Heard about us', selected.referral_source || 'Not specified'],
                ].map(([icon, label, value], index, all) => (
                  <div key={label} className={cx('flex items-start gap-3 bg-white p-4', index === all.length - 1 && all.length % 2 === 1 && 'sm:col-span-2')}>
                    <Icon name={icon} className="mt-0.5 text-[18px] text-primary" />
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#A88B8B]">{label}</dt>
                      <dd className="break-words text-sm font-medium text-[#1F0808]">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex justify-end border-t border-[#F3E9E9] pt-4">
                <Btn variant="danger" icon="delete" onClick={() => remove(selected)}>Delete inquiry</Btn>
              </div>
            </Card>
          ) : (
            <Card className="hidden items-center justify-center p-10 text-sm text-[#A88B8B] lg:flex">Select an inquiry to see the details.</Card>
          )}
        </div>
      )}
    </>
  )
}
