import SettingsForm from '@/components/admin/SettingsForm'
import { PageHeader } from '@/components/admin/ui'

export default function SettingsPage() {
  return (
    <>
      <PageHeader eyebrow="School office" title="Site settings" description="Contact details and footer information used across the whole website." />
      <SettingsForm />
    </>
  )
}
