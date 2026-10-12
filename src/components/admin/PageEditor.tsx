'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useSupabase } from '@/lib/supabase-context'
import { CmsRecord, PageDef, getCollection, pages, sectionResource, timeAgo } from './config'
import CollectionManager from './CollectionManager'
import RecordEditor from './RecordEditor'
import { Btn, Card, Icon, PageHeader, Skeleton, StatusBadge, Toggle, cx, useFeedback } from './ui'

type SectionDef = PageDef['sections'][number]

export default function PageEditor({ page }: { page: PageDef }) {
  const supabase = useSupabase()
  const { toast } = useFeedback()
  const [sections, setSections] = useState<CmsRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<SectionDef | null>(null)
  const [openCollections, setOpenCollections] = useState<Record<string, boolean>>({})

  const load = useCallback(async () => {
    const { data, error: queryError } = await supabase.from('page_sections').select('*').eq('page_key', page.key)
    setLoading(false)
    if (queryError) setError(queryError.message)
    else setSections(data || [])
  }, [supabase, page.key])

  useEffect(() => {
    setLoading(true)
    void load()
  }, [load])

  const recordFor = (def: SectionDef) => sections.find((item) => item.section_key === def.key) || null

  async function togglePublished(record: CmsRecord) {
    const next = !record.is_published
    setSections((current) => current.map((item) => item.id === record.id ? { ...item, is_published: next } : item))
    const { error: updateError } = await supabase.from('page_sections').update({ is_published: next }).eq('id', record.id)
    if (updateError) {
      toast(updateError.message, 'error')
      await load()
    } else {
      toast(next ? 'Section is live' : 'Section hidden. The page shows its default text')
    }
  }

  const editingRecord = editing ? recordFor(editing) : null
  const filled = page.sections.filter((def) => recordFor(def)).length

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/admin/pages" className="inline-flex items-center gap-1 hover:underline"><Icon name="arrow_back" className="text-[14px]" />All pages</Link>}
        title={`${page.label} page`}
        description={page.description}
        actions={
          <a href={page.path} target="_blank" rel="noreferrer">
            <Btn icon="open_in_new">View live page</Btn>
          </a>
        }
      >
        <nav className="mt-6 flex gap-1 overflow-x-auto border-b border-[#EFE3E3]" aria-label="Pages">
          {pages.map((item) => (
            <Link
              key={item.key}
              href={`/admin/pages/${item.key}`}
              className={cx(
                '-mb-px flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-semibold transition',
                item.key === page.key ? 'border-primary text-primary' : 'border-transparent text-[#8C6F6F] hover:text-[#1F0808]',
              )}
            >
              <Icon name={item.icon} className="text-[18px]" />
              {item.label}
            </Link>
          ))}
        </nav>
      </PageHeader>

      {error && <div role="alert" className="mb-6 rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-sm text-[#B42318]">{error}</div>}

      <div className="grid gap-8 xl:grid-cols-[1fr_280px]">
        <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-[#EADADA] sm:before:left-[23px]">
          {page.sections.map((def, index) => {
            const record = recordFor(def)
            return (
              <li key={def.key} className="relative flex gap-3 sm:gap-4">
                <div className={cx(
                  'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ring-4 ring-[#FCF9F9] sm:h-12 sm:w-12',
                  record?.is_published ? 'bg-primary text-white' : 'bg-white text-[#A88B8B] ring-offset-0 [box-shadow:inset_0_0_0_1.5px_#E3D1D1]',
                )}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                <Card className="min-w-0 flex-1 overflow-hidden">
                  <div className="flex flex-col gap-3 border-b border-[#F3E9E9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-bold text-[#1F0808]">{def.label}</h2>
                        {loading ? null : record ? <StatusBadge published={record.is_published} /> : (
                          <span className="rounded-full bg-[#FFF4E5] px-2.5 py-0.5 text-xs font-semibold text-[#B54708]">Using default text</span>
                        )}
                      </div>
                      <p className="text-[13px] text-[#8C6F6F]">{def.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {record && <Toggle checked={record.is_published} onChange={() => togglePublished(record)} label={`Show ${def.label} section`} />}
                      <Btn size="sm" variant={record ? 'secondary' : 'primary'} icon={record ? 'edit' : 'add'} onClick={() => setEditing(def)}>
                        {record ? 'Edit' : 'Customise'}
                      </Btn>
                    </div>
                  </div>

                  <button type="button" onClick={() => setEditing(def)} className="block w-full px-5 py-4 text-left transition hover:bg-[#FFFAFA]">
                    {loading ? (
                      <div className="space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-5 w-2/3" /><Skeleton className="h-3 w-full" /></div>
                    ) : record ? (
                      <div className="flex gap-4">
                        <div className="min-w-0 flex-1">
                          {record.eyebrow && <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{record.eyebrow}</div>}
                          <div className="text-[17px] font-extrabold leading-snug text-[#1F0808]">{record.heading || <span className="text-[#C9B3B3]">No heading</span>}</div>
                          {record.body && <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-[#7A5C5C]">{record.body}</p>}
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#A88B8B]">
                            {record.cta_label && <span className="inline-flex items-center gap-1 rounded-md bg-[#FBEAEA] px-2 py-0.5 font-semibold text-primary"><Icon name="smart_button" className="text-[14px]" />{record.cta_label}</span>}
                            {record.updated_at && <span>Updated {timeAgo(record.updated_at)}</span>}
                          </div>
                        </div>
                        {record.image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={record.image_url} alt="" className="hidden h-20 w-28 shrink-0 rounded-lg object-cover ring-1 ring-black/5 sm:block" />
                        )}
                      </div>
                    ) : (
                      <p className="text-[13px] text-[#8C6F6F]">This section currently shows the website’s built-in text. Click <b>Customise</b> to write your own.</p>
                    )}
                  </button>

                  {def.collections?.map((collectionKey) => {
                    const collection = getCollection(collectionKey)
                    if (!collection) return null
                    const id = `${def.key}:${collectionKey}`
                    const expanded = openCollections[id]
                    return (
                      <div key={collectionKey} className="border-t border-[#F3E9E9] bg-[#FDFAFA]">
                        <button
                          type="button"
                          aria-expanded={expanded}
                          onClick={() => setOpenCollections((current) => ({ ...current, [id]: !current[id] }))}
                          className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-semibold text-[#5C2E2E] hover:text-primary"
                        >
                          <Icon name={collection.icon} className="text-[18px] text-primary" />
                          <span className="flex-1">{collection.label}</span>
                          <span className="hidden text-xs font-medium text-[#A88B8B] sm:inline">{expanded ? 'Hide' : 'Manage items'}</span>
                          <Icon name="expand_more" className={cx('text-[20px] transition-transform', expanded && 'rotate-180')} />
                        </button>
                        {expanded && (
                          <div className="px-5 pb-5">
                            <CollectionManager resource={collection} embedded />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </Card>
              </li>
            )
          })}
        </ol>

        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-4">
            <Card className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.cover} alt="" className="h-32 w-full object-cover" />
              <div className="p-5">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#A88B8B]">Page health</div>
                <div className="mt-2 text-2xl font-extrabold text-[#1F0808]">{filled}/{page.sections.length}</div>
                <div className="text-[13px] text-[#8C6F6F]">sections customised</div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F4ECEC]">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(filled / page.sections.length) * 100}%` }} />
                </div>
              </div>
            </Card>
            <Card className="p-5 text-[13px] leading-relaxed text-[#7A5C5C]">
              <div className="mb-2 flex items-center gap-2 font-bold text-[#1F0808]"><Icon name="tips_and_updates" className="text-[18px] text-primary" />How it works</div>
              Sections appear on the website in the order shown. Hidden or empty sections fall back to the original website text, so the page never looks broken.
            </Card>
          </div>
        </aside>
      </div>

      {editing && (
        <RecordEditor
          resource={sectionResource(editing)}
          record={editingRecord}
          open
          title={`${editing.label} section`}
          subtitle={`${page.label} page`}
          createDefaults={{ page_key: page.key, section_key: editing.key, display_order: page.sections.indexOf(editing) + 1 }}
          onClose={() => setEditing(null)}
          onSaved={load}
        />
      )}
    </>
  )
}
