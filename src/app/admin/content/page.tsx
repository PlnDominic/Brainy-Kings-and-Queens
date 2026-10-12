import { redirect } from 'next/navigation'

// Older links pointed at /admin/content?tab=…; send them to the new sections.
export default async function LegacyContentPage({ searchParams }: { searchParams: Promise<{ tab?: string; type?: string }> }) {
  const { tab, type } = await searchParams
  if (tab === 'media') redirect('/admin/media')
  if (tab === 'settings') redirect('/admin/settings')
  if (tab === 'inquiries') redirect('/admin/inquiries')
  if (type === 'page_sections') redirect('/admin/pages')
  if (type === 'gallery_items') redirect('/admin/collections/gallery_home')
  if (type) redirect(`/admin/collections/${type}`)
  redirect('/admin/pages')
}
