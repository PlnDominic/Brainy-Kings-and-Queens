'use client'

import { ComponentProps, ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function Icon({ name, className, filled }: { name: string; className?: string; filled?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx('material-symbols-outlined select-none leading-none', className)}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  )
}

type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'dark'
const BTN_VARIANTS: Record<BtnVariant, string> = {
  primary: 'bg-primary text-white shadow-sm shadow-primary/30 hover:bg-[#9a1717] active:bg-[#851313]',
  secondary: 'bg-white text-on-surface ring-1 ring-inset ring-[#E9DCDC] hover:bg-[#FBF6F6] hover:ring-[#DCC8C8]',
  ghost: 'text-on-surface-variant hover:bg-[#F6EEEE] hover:text-on-surface',
  danger: 'bg-white text-[#B42318] ring-1 ring-inset ring-[#F3D0CC] hover:bg-[#FEF3F2]',
  dark: 'bg-[#2A0C0C] text-white hover:bg-[#3A1414]',
}

export function Btn({
  variant = 'secondary', size = 'md', icon, iconRight, loading, className, children, ...props
}: ComponentProps<'button'> & { variant?: BtnVariant; size?: 'sm' | 'md'; icon?: string; iconRight?: string; loading?: boolean }) {
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || loading}
      className={cx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'h-8 px-3 text-[13px]' : 'h-10 px-4 text-sm',
        !children && (size === 'sm' ? 'w-8 px-0' : 'w-10 px-0'),
        BTN_VARIANTS[variant],
        className,
      )}
    >
      {loading ? <Icon name="progress_activity" className="animate-spin text-[18px]" /> : icon && <Icon name={icon} className="text-[18px]" />}
      {children}
      {iconRight && <Icon name={iconRight} className="text-[18px]" />}
    </button>
  )
}

export const inputClass =
  'w-full rounded-lg border border-[#E6D8D8] bg-white px-3 py-2.5 text-sm text-on-surface placeholder:text-[#B39C9C] shadow-[0_1px_0_rgba(0,0,0,0.02)] transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:bg-[#FAF6F6]'

export function FieldShell({ label, help, required, children, className, htmlFor }: {
  label: string; help?: string; required?: boolean; children: ReactNode; className?: string; htmlFor?: string
}) {
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-on-surface">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      {children}
      {help && <p className="text-xs text-[#8C6F6F]">{help}</p>}
    </div>
  )
}

export function Toggle({ checked, onChange, label, disabled }: { checked: boolean; onChange: (value: boolean) => void; label?: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cx(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50',
        checked ? 'bg-[#16A34A]' : 'bg-[#D9CACA]',
      )}
    >
      <span className={cx('inline-block h-5 w-5 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-[22px]' : 'translate-x-0.5')} />
    </button>
  )
}

export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span className={cx(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
      published ? 'bg-[#ECFDF3] text-[#067647]' : 'bg-[#F4EEEE] text-[#7A5C5C]',
    )}>
      <span className={cx('h-1.5 w-1.5 rounded-full', published ? 'bg-[#17B26A]' : 'bg-[#B8A1A1]')} />
      {published ? 'Live' : 'Hidden'}
    </span>
  )
}

export function Card({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} className={cx('rounded-2xl border border-[#EFE3E3] bg-white shadow-[0_1px_2px_rgba(42,12,12,0.04)]', className)}>
      {children}
    </div>
  )
}

export function PageHeader({ eyebrow, title, description, actions, children }: {
  eyebrow?: ReactNode; title: ReactNode; description?: ReactNode; actions?: ReactNode; children?: ReactNode
}) {
  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          {eyebrow && <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</div>}
          <h1 className="font-headline-lg text-[28px] font-extrabold leading-tight tracking-tight text-[#1F0808] sm:text-[32px]">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#7A5C5C]">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </header>
  )
}

export function EmptyState({ icon, title, body, action }: { icon: string; title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#EADADA] bg-[#FFFCFC] px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBEAEA] text-primary">
        <Icon name={icon} className="text-[28px]" />
      </div>
      <h3 className="text-base font-bold text-[#1F0808]">{title}</h3>
      {body && <p className="mt-1 max-w-sm text-sm text-[#8C6F6F]">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx('animate-pulse rounded-lg bg-[#F3EAEA]', className)} />
}

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div className="relative w-full sm:w-72">
      <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#B39C9C]" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder || 'Search…'}
        className={cx(inputClass, 'pl-9')}
      />
    </div>
  )
}

// ── Toasts & confirmation ───────────────────────────────────────────────────

type Toast = { id: number; tone: 'success' | 'error' | 'info'; message: string }
type ConfirmRequest = { title: string; body?: string; confirmLabel?: string; resolve: (ok: boolean) => void }

const FeedbackContext = createContext<{
  toast: (message: string, tone?: Toast['tone']) => void
  confirm: (options: Omit<ConfirmRequest, 'resolve'>) => Promise<boolean>
} | null>(null)

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [request, setRequest] = useState<ConfirmRequest | null>(null)
  const nextId = useRef(0)

  const toast = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = ++nextId.current
    setToasts((current) => [...current, { id, tone, message }])
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), tone === 'error' ? 6000 : 3500)
  }, [])

  const confirm = useCallback((options: Omit<ConfirmRequest, 'resolve'>) => (
    new Promise<boolean>((resolve) => setRequest({ ...options, resolve }))
  ), [])

  function close(ok: boolean) {
    request?.resolve(ok)
    setRequest(null)
  }

  useEffect(() => {
    if (!request) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <FeedbackContext.Provider value={{ toast, confirm }}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-[200] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((item) => (
          <div
            key={item.id}
            role={item.tone === 'error' ? 'alert' : 'status'}
            className="pointer-events-auto flex items-start gap-3 rounded-xl bg-[#1F0808] px-4 py-3 text-sm text-white shadow-2xl shadow-black/20 animate-[cms-toast_.25s_ease-out]"
          >
            <Icon
              filled
              name={item.tone === 'error' ? 'error' : item.tone === 'info' ? 'info' : 'check_circle'}
              className={cx('mt-px text-[20px]', item.tone === 'error' ? 'text-[#FDA29B]' : item.tone === 'info' ? 'text-[#FFD6D6]' : 'text-[#75E0A7]')}
            />
            <span className="leading-snug">{item.message}</span>
          </div>
        ))}
      </div>
      {request && (
        <div className="fixed inset-0 z-[190] flex items-center justify-center bg-[#1F0808]/50 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) close(false) }}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="cms-confirm-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FEE4E2] text-[#D92D20]">
              <Icon name="delete" className="text-[22px]" />
            </div>
            <h2 id="cms-confirm-title" className="text-lg font-bold text-[#1F0808]">{request.title}</h2>
            {request.body && <p className="mt-1.5 text-sm text-[#7A5C5C]">{request.body}</p>}
            <div className="mt-6 flex justify-end gap-2">
              <Btn onClick={() => close(false)}>Cancel</Btn>
              <Btn variant="primary" className="!bg-[#D92D20] hover:!bg-[#B42318]" autoFocus onClick={() => close(true)}>
                {request.confirmLabel || 'Delete'}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </FeedbackContext.Provider>
  )
}

export function useFeedback() {
  const context = useContext(FeedbackContext)
  if (!context) throw new Error('useFeedback must be used within FeedbackProvider')
  return context
}
