import Link from 'next/link'
import { pages } from '@/components/admin/config'
import { Card, Icon, PageHeader } from '@/components/admin/ui'

export default function PagesOverview() {
  return (
    <>
      <PageHeader title="Website pages" description="Choose a page to edit. Sections are listed in the order visitors see them." />
      <div className="grid gap-5 md:grid-cols-2">
        {pages.map((page) => (
          <Link key={page.key} href={`/admin/pages/${page.key}`} className="group">
            <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2A0C0C]/5">
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={page.cover} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#2A0C0C]/50" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
                  <div>
                    <div className="font-mono text-xs text-white/70">{page.path}</div>
                    <div className="text-2xl font-extrabold">{page.label}</div>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-primary">
                    <Icon name="arrow_forward" className="text-[20px]" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="mb-4 text-sm text-[#7A5C5C]">{page.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {page.sections.map((section, index) => (
                    <span key={section.key} className="rounded-md bg-[#F7EFEF] px-2 py-1 text-xs font-medium text-[#5C2E2E]">
                      <span className="mr-1 text-[#B39C9C]">{index + 1}</span>{section.label}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
