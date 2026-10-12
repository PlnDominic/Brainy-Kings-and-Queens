'use client'

import { ChangeEvent, DragEvent, useCallback, useEffect, useState } from 'react'
import { useSupabase } from '@/lib/supabase-context'
import { ACCEPTED_IMAGE_TYPES, CmsRecord, MAX_UPLOAD_BYTES, MEDIA_BUCKET, fileNamePart, formatBytes } from './config'
import { Btn, EmptyState, Icon, SearchInput, Skeleton, cx, useFeedback } from './ui'

export function useMedia(autoLoad = true) {
  const supabase = useSupabase()
  const [items, setItems] = useState<CmsRecord[]>([])
  const [loading, setLoading] = useState(autoLoad)
  const [uploading, setUploading] = useState(false)

  const publicUrl = useCallback((path: string) => (
    path.startsWith('http') ? path : supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl
  ), [supabase])

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('media_library').select('*').order('created_at', { ascending: false })
    setLoading(false)
    if (error) throw new Error(error.message)
    setItems(data || [])
  }, [supabase])

  useEffect(() => {
    if (autoLoad) load().catch(() => setItems([]))
  }, [autoLoad, load])

  const upload = useCallback(async (file: File): Promise<string> => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) throw new Error('Choose a JPEG, PNG, WebP or GIF image.')
    if (file.size > MAX_UPLOAD_BYTES) throw new Error('Images must be 5 MB or smaller.')
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw new Error('Your session has expired. Sign in again.')

    setUploading(true)
    try {
      const path = `${user.id}/${crypto.randomUUID()}-${fileNamePart(file.name)}`
      const { data: uploaded, error: uploadError } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
        contentType: file.type,
        upsert: false,
      })
      if (uploadError) throw new Error(uploadError.message)

      const { error: metadataError } = await supabase.from('media_library').insert({
        file_path: uploaded.path,
        original_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: user.id,
      })
      if (metadataError) {
        await supabase.storage.from(MEDIA_BUCKET).remove([uploaded.path])
        throw new Error(metadataError.message)
      }
      return publicUrl(uploaded.path)
    } finally {
      setUploading(false)
    }
  }, [supabase, publicUrl])

  const remove = useCallback(async (record: CmsRecord) => {
    const { error: storageError } = await supabase.storage.from(MEDIA_BUCKET).remove([record.file_path])
    if (storageError) throw new Error(storageError.message)
    const { error: rowError } = await supabase.from('media_library').delete().eq('id', record.id)
    if (rowError) throw new Error(rowError.message)
  }, [supabase])

  return { items, loading, uploading, load, upload, remove, publicUrl }
}

function filesFrom(event: ChangeEvent<HTMLInputElement> | DragEvent) {
  const list = 'dataTransfer' in event ? event.dataTransfer.files : event.target.files
  return Array.from(list || [])
}

export function DropZone({ onFiles, uploading, compact }: { onFiles: (files: File[]) => void; uploading: boolean; compact?: boolean }) {
  const [over, setOver] = useState(false)
  return (
    <label
      onDragOver={(event) => { event.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => { event.preventDefault(); setOver(false); onFiles(filesFrom(event)) }}
      className={cx(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed text-center transition',
        compact ? 'px-4 py-6' : 'px-6 py-10',
        over ? 'border-primary bg-[#FFF1F1]' : 'border-[#E6D3D3] bg-[#FFFCFC] hover:border-primary/50 hover:bg-[#FFF7F7]',
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FBEAEA] text-primary">
        <Icon name={uploading ? 'progress_activity' : 'cloud_upload'} className={cx('text-[22px]', uploading && 'animate-spin')} />
      </div>
      <div className="text-sm font-semibold text-[#1F0808]">
        {uploading ? 'Uploading…' : <>Drop images here or <span className="text-primary underline underline-offset-2">browse</span></>}
      </div>
      <div className="text-xs text-[#8C6F6F]">JPEG, PNG, WebP or GIF · up to 5 MB each</div>
      <input
        type="file"
        multiple
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        className="sr-only"
        disabled={uploading}
        onChange={(event) => { onFiles(filesFrom(event)); event.target.value = '' }}
      />
    </label>
  )
}

/** Modal for choosing an existing library image or uploading a new one. */
export function MediaPicker({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (url: string) => void }) {
  const media = useMedia(false)
  const { toast } = useFeedback()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (open) media.load().catch((error) => toast(error.message, 'error'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  async function handleFiles(files: File[]) {
    const file = files[0]
    if (!file) return
    try {
      const url = await media.upload(file)
      toast('Image uploaded')
      onSelect(url)
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Upload failed', 'error')
    }
  }

  const visible = media.items.filter((item) => (item.original_name || '').toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="fixed inset-0 z-[150] flex items-end justify-center bg-[#1F0808]/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div role="dialog" aria-modal="true" aria-label="Choose an image" className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-[#F1E6E6] px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-[#1F0808]">Choose an image</h2>
            <p className="text-sm text-[#8C6F6F]">Pick from your library or upload a new photo.</p>
          </div>
          <Btn variant="ghost" icon="close" aria-label="Close" onClick={onClose} />
        </div>
        <div className="overflow-y-auto p-6">
          <DropZone compact uploading={media.uploading} onFiles={handleFiles} />
          <div className="mb-4 mt-6 flex items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-[#1F0808]">Library <span className="font-medium text-[#8C6F6F]">· {media.items.length}</span></h3>
            <SearchInput value={query} onChange={setQuery} placeholder="Search files" />
          </div>
          {media.loading ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="aspect-square" />)}
            </div>
          ) : visible.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#8C6F6F]">No images yet. Upload one above.</p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {visible.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(media.publicUrl(item.file_path))}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-[#F6EEEE] ring-primary transition hover:ring-2 focus-visible:outline-none focus-visible:ring-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={media.publicUrl(item.file_path)} alt={item.original_name || ''} className="h-full w-full object-cover transition group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-4 text-left text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                    {item.original_name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function MediaLibraryView() {
  const media = useMedia()
  const { toast, confirm } = useFeedback()
  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState<CmsRecord | null>(null)

  async function handleFiles(files: File[]) {
    let done = 0
    for (const file of files) {
      try {
        await media.upload(file)
        done += 1
      } catch (error) {
        toast(`${file.name}: ${error instanceof Error ? error.message : 'upload failed'}`, 'error')
      }
    }
    if (done) toast(`${done} image${done === 1 ? '' : 's'} uploaded`)
    await media.load().catch((error) => toast(error.message, 'error'))
  }

  async function handleDelete(item: CmsRecord) {
    const ok = await confirm({ title: `Delete ${item.original_name || 'this image'}?`, body: 'Pages that still use this image will show a broken picture. This cannot be undone.' })
    if (!ok) return
    try {
      await media.remove(item)
      setPreview(null)
      toast('Image deleted')
      await media.load()
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Delete failed', 'error')
    }
  }

  async function copyUrl(item: CmsRecord) {
    await navigator.clipboard.writeText(media.publicUrl(item.file_path))
    toast('Image link copied', 'info')
  }

  const visible = media.items.filter((item) => (item.original_name || '').toLowerCase().includes(query.toLowerCase()))
  const totalBytes = media.items.reduce((sum, item) => sum + (item.size_bytes || 0), 0)

  return (
    <>
      <div className="mb-6">
        <DropZone uploading={media.uploading} onFiles={handleFiles} />
      </div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#8C6F6F]">
          <span className="font-semibold text-[#1F0808]">{media.items.length}</span> images · {formatBytes(totalBytes)} used
        </p>
        <SearchInput value={query} onChange={setQuery} placeholder="Search by file name" />
      </div>
      {media.loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="aspect-[4/3]" />)}
        </div>
      ) : visible.length === 0 ? (
        <EmptyState icon="photo_library" title={query ? 'No matching images' : 'Your library is empty'} body="Uploaded photos appear here and can be used anywhere on the website." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((item) => (
            <figure key={item.id} className="group overflow-hidden rounded-2xl border border-[#EFE3E3] bg-white shadow-[0_1px_2px_rgba(42,12,12,0.04)] transition hover:shadow-lg hover:shadow-[#2A0C0C]/5">
              <button type="button" onClick={() => setPreview(item)} className="relative block aspect-[4/3] w-full overflow-hidden bg-[#F6EEEE]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media.publicUrl(item.file_path)} alt={item.original_name || ''} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </button>
              <figcaption className="flex items-center gap-2 px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-[#1F0808]">{item.original_name || 'Untitled'}</div>
                  <div className="text-[11px] text-[#8C6F6F]">{formatBytes(item.size_bytes)}</div>
                </div>
                <Btn size="sm" variant="ghost" icon="link" aria-label="Copy link" onClick={() => copyUrl(item)} />
                <Btn size="sm" variant="ghost" icon="delete" aria-label={`Delete ${item.original_name}`} className="hover:!text-[#D92D20]" onClick={() => handleDelete(item)} />
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#0E0303]/85 p-4 backdrop-blur" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreview(null) }}>
          <div className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex min-h-0 flex-1 items-center justify-center bg-[#F6EEEE]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media.publicUrl(preview.file_path)} alt={preview.original_name || ''} className="max-h-[70vh] w-auto object-contain" />
            </div>
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="truncate font-semibold text-[#1F0808]">{preview.original_name}</div>
                <div className="text-xs text-[#8C6F6F]">{preview.mime_type} · {formatBytes(preview.size_bytes)} · uploaded {new Date(preview.created_at).toLocaleDateString()}</div>
              </div>
              <div className="flex gap-2">
                <Btn icon="link" onClick={() => copyUrl(preview)}>Copy link</Btn>
                <Btn variant="danger" icon="delete" onClick={() => handleDelete(preview)}>Delete</Btn>
                <Btn variant="dark" onClick={() => setPreview(null)}>Close</Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
