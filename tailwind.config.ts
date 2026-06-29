import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Surfaces (clean white palette) ────────────────────────────
        surface: '#FFFAFA',
        'surface-bright': '#FFFFFF',
        'surface-dim': '#F0E8E8',
        'surface-variant': '#F5ECEC',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#FEF5F5',
        'surface-container': '#FAF0F0',
        'surface-container-high': '#F5EDED',
        'surface-container-highest': '#F0E8E8',
        'surface-container-low-opacity': 'rgba(254,245,245,0.9)',
        'surface-tint': '#B31B1B',
        background: '#FFFAFA',
        'on-background': '#1A0A0A',

        // ── On-surface text ──────────────────────────────────────────
        'on-surface': '#1A0A0A',
        'on-surface-variant': '#5C2E2E',
        'inverse-surface': '#2C0A0A',
        'inverse-on-surface': '#FFF0F0',

        // ── Primary — deep tartan red ────────────────────────────────
        primary: '#B31B1B',
        'on-primary': '#ffffff',
        'primary-container': '#D94F4F',
        'on-primary-container': '#FFF0F0',
        'primary-fixed': '#FFD6D6',
        'primary-fixed-dim': '#E89090',
        'on-primary-fixed': '#1A0000',
        'on-primary-fixed-variant': '#8B0000',
        'inverse-primary': '#FFB0B0',

        // ── Secondary — dark maroon ──────────────────────────────────
        secondary: '#8B1A1A',
        'on-secondary': '#ffffff',
        'secondary-container': '#C8A951',   // gold from uniform badge
        'on-secondary-container': '#1A0A00',
        'secondary-fixed': '#E8C88A',
        'secondary-fixed-dim': '#C8A048',
        'on-secondary-fixed': '#1A0800',
        'on-secondary-fixed-variant': '#6B4500',

        // ── Tertiary — warm gold ─────────────────────────────────────
        tertiary: '#8B6914',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#C69232',
        'on-tertiary-container': '#FFF8F5',
        'tertiary-fixed': '#F5DEB3',
        'tertiary-fixed-dim': '#D4A882',
        'on-tertiary-fixed': '#1A0600',
        'on-tertiary-fixed-variant': '#5C4200',
        'on-tertiary-fixed-dim': '#E8C88A',

        // ── Outline ──────────────────────────────────────────────────
        outline: '#9C6464',
        'outline-variant': '#D4B4B4',

        // ── Error ────────────────────────────────────────────────────
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        xs: '4px',
        xl: '80px',
        lg: '48px',
        sm: '12px',
        'margin-mobile': '16px',
        base: '8px',
        'margin-desktop': '64px',
        md: '24px',
        gutter: '24px',
      },
      fontFamily: {
        'headline-lg-mobile': ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        'headline-md': ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        'headline-lg': ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        'headline-xl': ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        'label-sm': ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        'label-lg': ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        'body-md': ['var(--font-be-vietnam)', 'system-ui', 'sans-serif'],
        'body-lg': ['var(--font-be-vietnam)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'headline-lg-mobile': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'label-lg': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'headline-xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '800' }],
      },
    },
  },
  plugins: [],
}

export default config
