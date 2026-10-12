'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSupabase } from '@/lib/supabase-context'
import { CmsRecord, pages, timeAgo } from './config'
import { isNewInquiry } from './InquiriesInbox'
import { Card, Icon, Skeleton, cx } from './ui'

export default function Dashboard() {
  const supabase = useSupabase()
  const [sections, setSections] = useState<CmsRecord[]>([])
  const [inquiries, setInquiries] = useState<CmsRecord[]>([])
  const [inquiryTotal, setInquiryTotal] = useState(0)
  const [mediaTotal, setMediaTotal] = useState(0)
  const [newTotal, setNewTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      const since = new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
      const [sectionResult, inquiryResult, mediaResult, newResult] = await Promise.all([
        supabase.from('page_sections').select('id, page_key, section_key, heading, is_published, updated_at').order('updated_at', { ascending: false }),
        supabase.from('admissions_inquiries').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5),
        supabase.from('media_library').select('id', { count: 'exact', head: true }),
        supabase.from('admissions_inquiries').select('id', { count: 'exact', head: true }).gte('created_at', since),
      ])
      if (!active) return
      setSections(sectionResult.data || [])
      setInquiries(inquiryResult.data || [])
      setInquiryTotal(inquiryResult.count || 0)
      setMediaTotal(mediaResult.count || 0)
      setNewTotal(newResult.count || 0)
      setLoading(false)
    }
    void load()
    return () => { active = false }
  }, [supabase])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const totalSections = pages.reduce((sum, page) => sum + page.sections.length, 0)
  const liveSections = sections.filter((section) => section.is_published).length

  const stats = [
    { label: 'New inquiries', value: newTotal, hint: `${inquiryTotal} total`, icon: 'mark_email_unread', href: '/admin/inquiries' },
    { label: 'Live sections', value: liveSections, hint: `of ${totalSections} across 4 pages`, icon: 'web', href: '/admin/pages' },
    { label: 'Photos', value: mediaTotal, hint: 'uploaded', icon: 'perm_media', href: '/admin/media' },
  ]

  return (
    <>
      <section className="relative mb-8 overflow-hidden rounded-3xl bg-[#2A0C0C] px-6 py-8 text-white shadow-xl shadow-[#2A0C0C]/10 sm:px-10 sm:py-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/school-building.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-[#2A0C0C]/80" />
        <div className="relative max-w-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#FFB4B4] backdrop-blur">
            <Icon name="crown" filled className="text-[14px]" /> Brainy Kings &amp; Queens Montessori
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{greeting}.</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-white/70">
            Everything visitors see on the website (headlines, photos, programs, parent stories and contact details) is managed from here. Changes go live the moment you save.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/admin/pages/home" className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[#c42424]">
              <Icon name="edit" className="text-[18px]" /> Edit home page
            </Link>
            <Link href="/admin/inquiries" className="inline-flex h-10 items-center gap-2 rounded-lg bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              <Icon name="inbox" className="text-[18px]" /> Check inquiries
            </Link>
          </div>
        </div>
      </section>

      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="group h-full p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2A0C0C]/5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBEAEA] text-primary">
                  <Icon name={stat.icon} className="text-[20px]" />
                </div>
                <Icon name="arrow_outward" className="text-[18px] text-[#D4BFBF] transition group-hover:text-primary" />
              </div>
              {loading ? <Skeleton className="h-8 w-12" /> : <div className="text-3xl font-extrabold tracking-tight text-[#1F0808]">{stat.value}</div>}
              <div className="mt-1 text-[13px] font-semibold text-[#5C2E2E]">{stat.label}</div>
              <div className="text-xs text-[#A88B8B]">{stat.hint}</div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-[#1F0808]">Website pages</h2>
              <p className="text-[13px] text-[#8C6F6F]">Edit each page section by section.</p>
            </div>
            <Link href="/admin/pages" className="text-sm font-semibold text-primary hover:underline">All pages</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {pages.map((page) => {
              const pageSections = sections.filter((section) => section.page_key === page.key)
              const live = pageSections.filter((section) => section.is_published).length
              const updated = pageSections[0]?.updated_at
              return (
                <Link key={page.key} href={`/admin/pages/${page.key}`} className="group">
                  <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2A0C0C]/5">
                    <div className="relative h-28 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={page.cover} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-[#2A0C0C]/45" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                        <Icon name={page.icon} className="text-[20px]" />
                        <span className="text-lg font-extrabold">{page.label}</span>
                      </div>
                      <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[11px] text-white/90 backdrop-blur">{page.path}</span>
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#5C2E2E]">{live}/{page.sections.length} sections live</span>
                        <span className="text-[#A88B8B]">{updated ? `Edited ${timeAgo(updated)}` : 'Not edited yet'}</span>
                      </div>
                      <div className="flex gap-1">
                        {page.sections.map((def) => {
                          const record = pageSections.find((section) => section.section_key === def.key)
                          return <span key={def.key} title={def.label} className={cx('h-1.5 flex-1 rounded-full', record?.is_published ? 'bg-primary' : record ? 'bg-[#E8B4B4]' : 'bg-[#F0E4E4]')} />
                        })}
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>

        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-[#1F0808]">Latest inquiries</h2>
              <p className="text-[13px] text-[#8C6F6F]">From the admissions form.</p>
            </div>
            <Link href="/admin/inquiries" className="text-sm font-semibold text-primary hover:underline">View all</Link>
          </div>
          <Card className="overflow-hidden">
            {loading ? (
              <div className="space-y-3 p-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
            ) : inquiries.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <Icon name="inbox" className="mb-2 text-[32px] text-[#D4BFBF]" />
                <p className="text-sm text-[#8C6F6F]">No inquiries yet.</p>
              </div>
            ) : (
              <ul className="divide-y divide-[#F3E9E9]">
                {inquiries.map((inquiry) => (
                  <li key={inquiry.id}>
                    <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 transition hover:bg-[#FFFAFA]">
                      <div className={cx('h-2 w-2 shrink-0 rounded-full', isNewInquiry(inquiry) ? 'bg-primary' : 'bg-transparent')} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-[#1F0808]">{inquiry.parent_name}</div>
                        <div className="truncate text-xs text-[#8C6F6F]">Child age {inquiry.child_age} · {inquiry.phone}</div>
                      </div>
                      <span className="shrink-0 text-[11px] text-[#A88B8B]">{timeAgo(inquiry.created_at)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>

        </section>
      </div>
    </>
  )
}
