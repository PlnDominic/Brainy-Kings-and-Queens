import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Surfaces (warm cream palette) ──────────────────────────────
        surface: '#FAF6F2',
        'surface-bright': '#FAF6F2',
        'surface-dim': '#E6D8D0',
        'surface-variant': '#EBE0D8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#F4EDE6',
        'surface-container': '#EFE6DE',
        'surface-container-high': '#E9DFD7',
        'surface-container-highest': '#E3D8D0',
        'surface-container-low-opacity': 'rgba(244,237,230,0.9)',
        'surface-tint': '#7B3F2B',
        background: '#FAF6F2',
        'on-background': '#1C0D06',

        // ── On-surface text ──────────────────────────────────────────
        'on-surface': '#1C0D06',          // very dark warm brown (dark section bg)
        'on-surface-variant': '#50382E',  // medium warm brown
        'inverse-surface': '#342119',     // dark inverse
        'inverse-on-surface': '#F5EDE6',  // light on dark inverse

        // ── Primary — semi-dark mahogany brown ───────────────────────
        primary: '#7B3F2B',
        'on-primary': '#ffffff',
        'primary-container': '#A0573F',
        'on-primary-container': '#FFF1EC',
        'primary-fixed': '#F0D5C8',
        'primary-fixed-dim': '#C4936E',
        'on-primary-fixed': '#1A0600',
        'on-primary-fixed-variant': '#5C2815',
        'inverse-primary': '#E8B9A3',

        // ── Secondary — warm amber-brown accent ──────────────────────
        secondary: '#6B4830',
        'on-secondary': '#ffffff',
        'secondary-container': '#C68642',  // amber-bronze CTA / accent
        'on-secondary-container': '#2C1600',
        'secondary-fixed': '#E8B87A',
        'secondary-fixed-dim': '#B8763A',
        'on-secondary-fixed': '#2C1400',
        'on-secondary-fixed-variant': '#4A2C12',

        // ── Tertiary — warm gold-brown ───────────────────────────────
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
        outline: '#8A6B5E',
        'outline-variant': '#D4C4BB',

        // ── Error (unchanged) ─────────────────────────────────────────
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
