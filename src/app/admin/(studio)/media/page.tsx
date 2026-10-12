import { MediaLibraryView } from '@/components/admin/media'
import { PageHeader } from '@/components/admin/ui'

export default function MediaPage() {
  return (
    <>
      <PageHeader eyebrow="School office" title="Media library" description="Every photo uploaded to the website. Images you upload here can be picked from any image field." />
      <MediaLibraryView />
    </>
  )
}
