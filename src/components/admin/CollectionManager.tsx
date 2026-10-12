'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSupabase } from '@/lib/supabase-context'
import { CmsRecord, CmsResource } from './config'
import RecordEditor from './RecordEditor'
import { Btn, EmptyState, Icon, SearchInput, Skeleton, Toggle, cx, useFeedback } from './ui'

export function useCollection(resource: CmsResource) {
  const supabase = useSupabase()
  const [records, setRecords] = useState<CmsRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    let query = supabase.from(resource.table as any).select('*')
    Object.entries(resource.scope || {}).forEach(([key, value]) => { query = query.eq(key, value) })
    const { data, error: queryError } = await query.order(resource.orderField || 'display_order', { ascending: !resource.orderDescending })
    setLoading(false)
    if (queryError) {
      setError(queryError.message)
      setRecords([])
    } else {
      setError('')
      setRecords(data || [])
    }
  }, [supabase, resource])

  useEffect(() => { void load() }, [load])

  return { records, loading, error, load, setRecords }
}

export default function CollectionManager({ resource, embedded = false }: { resource: CmsResource; embedded?: boolean }) {
  const supabase = useSupabase()
  const { toast, confirm } = useFeedback()
  const { records, loading, error, load, setRecords } = useCollection(resource)
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<CmsRecord | null>(null)
  const [creating, setCreating] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)

  const title = (record: CmsRecord) => record[resource.titleField] || record[resource.subtitleField || ''] || `Untitled ${resource.singular}`
  const status = resource.statusField

  const visible = records.filter((record) => {
    if (!query) return true
    const haystack = resource.fields.map((field) => String(record[field.key] ?? '')).join(' ').toLowerCase()
    return haystack.includes(query.toLowerCase())
  })

  async function togglePublished(record: CmsRecord) {
    if (!status) return
    const next = !record[status]
    setRecords((current) => current.map((item) => item.id === record.id ? { ...item, [status]: next } : item))
    const { error: updateError } = await supabase.from(resource.table as any).update({ [status]: next }).eq('id', record.id)
    if (updateError) {
      toast(updateError.message, 'error')
      await load()
    } else {
      toast(next ? `“${title(record)}” is now live` : `“${title(record)}” is hidden from the website`)
    }
  }

  async function move(record: CmsRecord, direction: -1 | 1) {
    const index = records.findIndex((item) => item.id === record.id)
    const target = records[index + direction]
    if (!target) return
    setBusyId(record.id)
    // Normalise order values so swapping always changes position, even when they were equal.
    const reordered = [...records]
    reordered.splice(index, 1)
    reordered.splice(index + direction, 0, record)
    const updates = reordered
      .map((item, position) => ({ item, order: position + 1 }))
      .filter(({ item, order }) => item.display_order !== order)
    setRecords(reordered.map((item, position) => ({ ...item, display_order: position + 1 })))
    const results = await Promise.all(updates.map(({ item, order }) =>
      supabase.from(resource.table as any).update({ display_order: order }).eq('id', item.id)))
    setBusyId(null)
    const failed = results.find((result) => result.error)
    if (failed?.error) {
      toast(failed.error.message, 'error')
      await load()
    }
  }

  async function remove(record: CmsRecord) {
    const ok = await confirm({ title: `Delete “${title(record)}”?`, body: 'It will be removed from the website immediately. This cannot be undone.' })
    if (!ok) return
    const { error: deleteError } = await supabase.from(resource.table as any).delete().eq('id', record.id)
    if (deleteError) {
      toast(deleteError.message, 'error')
      return
    }
    toast(`${resource.singular[0].toUpperCase()}${resource.singular.slice(1)} deleted`)
    await load()
  }

  const canReorder = !query && !resource.orderField && !resource.noReorder
  const liveCount = status ? records.filter((record) => record[status]).length : records.length

  return (
    <div>
      <div className={cx('mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', embedded && 'mb-3')}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#8C6F6F]">
            <b className="text-[#1F0808]">{records.length}</b> {records.length === 1 ? resource.singular : 'items'}
            {status && records.length > 0 && <> · {liveCount} on the website</>}
          </span>
        </div>
        <div className="flex gap-2">
          {!embedded && <SearchInput value={query} onChange={setQuery} placeholder={`Search ${resource.label.toLowerCase()}`} />}
          <Btn variant="primary" icon="add" onClick={() => setCreating(true)}>
            {embedded ? 'Add' : `New ${resource.singular}`}
          </Btn>
        </div>
      </div>

      {error ? (
        <div role="alert" className="rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-sm text-[#B42318]">{error}</div>
      ) : loading ? (
        <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[72px]" />)}</div>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={resource.icon}
          title={records.length ? 'Nothing matches your search' : `No ${resource.label.toLowerCase()} yet`}
          body={records.length ? 'Try a different search.' : resource.description}
          action={!records.length && <Btn variant="primary" icon="add" onClick={() => setCreating(true)}>Add the first {resource.singular}</Btn>}
        />
      ) : (
        <ul className="divide-y divide-[#F3E9E9] overflow-hidden rounded-2xl border border-[#EFE3E3] bg-white">
          {visible.map((record, index) => (
            <li key={record.id} className={cx('group flex items-center gap-3 px-3 py-3 transition hover:bg-[#FFFAFA] sm:gap-4 sm:px-4', busyId === record.id && 'opacity-60')}>
              {canReorder && (
                <div className="hidden flex-col sm:flex">
                  <button type="button" aria-label="Move up" disabled={index === 0 || busyId !== null} onClick={() => move(record, -1)} className="rounded text-[#B39C9C] hover:bg-[#F4ECEC] hover:text-primary disabled:invisible">
                    <Icon name="keyboard_arrow_up" className="text-[20px]" />
                  </button>
                  <button type="button" aria-label="Move down" disabled={index === visible.length - 1 || busyId !== null} onClick={() => move(record, 1)} className="rounded text-[#B39C9C] hover:bg-[#F4ECEC] hover:text-primary disabled:invisible">
                    <Icon name="keyboard_arrow_down" className="text-[20px]" />
                  </button>
                </div>
              )}

              <button type="button" onClick={() => setEditing(record)} className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-4">
                <Thumb resource={resource} record={record} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-semibold text-[#1F0808] group-hover:text-primary">{title(record)}</div>
                  {resource.subtitleField && record[resource.subtitleField] && record[resource.subtitleField] !== title(record) && (
                    <div className="truncate text-[13px] text-[#8C6F6F]">{record[resource.subtitleField]}</div>
                  )}
                </div>
              </button>

              {status && (
                <div className="hidden items-center gap-3 sm:flex">
                  <Toggle checked={Boolean(record[status])} onChange={() => togglePublished(record)} label={`Show ${title(record)} on website`} />
                </div>
              )}
              <div className="flex items-center gap-1">
                <Btn size="sm" variant="ghost" icon="edit" aria-label={`Edit ${title(record)}`} onClick={() => setEditing(record)} />
                <Btn size="sm" variant="ghost" icon="delete" aria-label={`Delete ${title(record)}`} className="hover:!text-[#D92D20]" onClick={() => remove(record)} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <RecordEditor
        resource={resource}
        record={editing}
        open={creating || editing !== null}
        title={editing ? title(editing) : undefined}
        createDefaults={{ display_order: records.length + 1 }}
        onClose={() => { setCreating(false); setEditing(null) }}
        onSaved={load}
      />
    </div>
  )
}

function Thumb({ resource, record }: { resource: CmsResource; record: CmsRecord }) {
  const image = resource.imageField ? record[resource.imageField] : null
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover ring-1 ring-black/5" />
  }
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FBEAEA] text-primary">
      <Icon name={record.icon || resource.icon} className="text-[22px]" />
    </div>
  )
}
