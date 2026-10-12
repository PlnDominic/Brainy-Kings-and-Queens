import SettingsForm from '@/components/admin/SettingsForm'
import { PageHeader } from '@/components/admin/ui'

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Contact details" description="Shown in the footer on every page and on the Admissions page." />
      <SettingsForm />
    </>
  )
}
