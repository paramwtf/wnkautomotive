/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink, #010101)',
        charcoal: 'var(--charcoal, #171717)',
        paper: 'var(--paper, #ffffff)',
        canvas: 'var(--paper, #ffffff)',
        surface: 'var(--surface, #f4f4f4)',
        'surface-2': '#f4f4f2',
        muted: 'var(--muted, #666666)',
        secondary: '#454545',
        line: 'var(--line, #dedede)',
        field: 'var(--field, #cecece)',
        red: {
          DEFAULT: 'var(--red, #f93030)',
          accent: '#f93030',
          dot: '#e61919',
        },
      },
      fontFamily: {
        sans: ['Archivo', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '2px',
        md: '4px',
        lg: '6px',
        pill: '9999px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.05)',
        card: '0 4px 12px rgba(0,0,0,0.06)',
        overlay: '0 20px 40px rgba(0,0,0,0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'content': '1324.8px',
      },
    },
  },
  plugins: [],
};

