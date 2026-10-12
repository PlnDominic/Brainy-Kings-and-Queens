import { notFound } from 'next/navigation'
import PageEditor from '@/components/admin/PageEditor'
import { getPage } from '@/components/admin/config'

export default async function PageEditorPage({ params }: { params: Promise<{ page: string }> }) {
  const page = getPage((await params).page)
  if (!page) notFound()
  return <PageEditor page={page} />
}
