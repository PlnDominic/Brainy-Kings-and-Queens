import { MediaLibraryView } from '@/components/admin/media'
import { PageHeader } from '@/components/admin/ui'

export default function MediaPage() {
  return (
    <>
      <PageHeader title="Photos" description="Upload photos here, then choose them from any image field." />
      <MediaLibraryView />
    </>
  )
}
