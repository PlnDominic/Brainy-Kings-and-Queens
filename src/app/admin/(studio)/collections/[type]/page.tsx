import { notFound } from 'next/navigation'
import CollectionManager from '@/components/admin/CollectionManager'
import { getCollection, pages } from '@/components/admin/config'
import { Icon, PageHeader } from '@/components/admin/ui'

export default async function CollectionPage({ params }: { params: Promise<{ type: string }> }) {
  const collection = getCollection((await params).type)
  if (!collection) notFound()
  const usedOn = pages.filter((page) => page.sections.some((section) => section.collections?.includes(collection.key)))
  return (
    <>
      <PageHeader
        eyebrow="Content library"
        title={collection.label}
        description={collection.description}
        actions={usedOn.map((page) => (
          <a key={page.key} href={page.path} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-[#5C2E2E] ring-1 ring-[#EADADA] hover:text-primary">
            <Icon name={page.icon} className="text-[15px]" /> {page.label}
          </a>
        ))}
      />
      <CollectionManager resource={collection} />
    </>
  )
}
