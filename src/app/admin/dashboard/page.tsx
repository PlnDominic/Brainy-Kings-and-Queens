'use client'

import AdminLayout from '@/components/AdminLayout'

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-headline-lg font-headline-lg text-on-surface mb-4">
          Dashboard
        </h1>
        <p className="text-body-md text-on-surface-variant mb-4">
          Welcome to the Content Management System. Select an option from the sidebar to manage your content.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          <div className="bg-surface-container-lowest border-t-4 border-primary p-lg shadow-sm cursor-pointer hover:shadow-xl transition-shadow" onClick={() => window.location.href = '/admin/content?tab=content'}>
            <span className="material-symbols-outlined text-[32px] text-primary mb-md">article</span>
            <h3 className="text-headline-md font-headline-md text-on-surface mb-2">Content Management</h3>
            <p className="text-body-md text-on-surface-variant">Manage pages, sections, and media content.</p>
          </div>

          <div className="bg-surface-container-lowest border-t-4 border-secondary p-lg shadow-sm cursor-pointer hover:shadow-xl transition-shadow" onClick={() => window.location.href = '/admin/content?tab=media'}>
            <span className="material-symbols-outlined text-[32px] text-secondary mb-md">image</span>
            <h3 className="text-headline-md font-headline-md text-on-surface mb-2">Media Library</h3>
            <p className="text-body-md text-on-surface-variant">Upload and manage images and media files.</p>
          </div>

          <div className="bg-surface-container-lowest border-t-4 border-outline p-lg shadow-sm cursor-pointer hover:shadow-xl transition-shadow" onClick={() => window.location.href = '/admin/content?tab=settings'}>
            <span className="material-symbols-outlined text-[32px] text-outline mb-md">settings</span>
            <h3 className="text-headline-md font-headline-md text-on-surface mb-2">Site Settings</h3>
            <p className="text-body-md text-on-surface-variant">Site configuration and admin settings.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}