import InquiriesInbox from '@/components/admin/InquiriesInbox'
import { PageHeader } from '@/components/admin/ui'

export default function InquiriesPage() {
  return (
    <>
      <PageHeader title="Admissions inquiries" description="Families who filled in the form on the Admissions page. Reply by email, phone or WhatsApp." />
      <InquiriesInbox />
    </>
  )
}
