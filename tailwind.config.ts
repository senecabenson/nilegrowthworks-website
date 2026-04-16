import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#2B2B2B',
        ink: '#141414',
        navy: '#1A2744',
        'navy-deep': '#121B30',
        ember: '#D6B53A',
        'ember-soft': '#E6CB6F',
        teal: '#1E93A3',
        mist: '#F0F1F2',
        fog: '#D6D9DB',
        slate: '#999EA3',
        iron: '#696D71',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        h1: ['clamp(3.5rem, 7vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        h2: ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.5rem, 2.6vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.2em' }],
        body: ['1.125rem', { lineHeight: '1.55' }],
      },
    },
  },
  plugins: [],
}
export default config
