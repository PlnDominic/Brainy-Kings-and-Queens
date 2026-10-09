'use client'

import { Suspense } from 'react'
import AdminContentManager from '@/components/AdminContentManager'
import AdminLayout from '@/components/AdminLayout'

export default function AdminContentPage() {
  return (
    <AdminLayout>
      <Suspense fallback={<p className="py-xl text-on-surface-variant">Loading content manager...</p>}>
        <AdminContentManager />
      </Suspense>
    </AdminLayout>
  )
}
