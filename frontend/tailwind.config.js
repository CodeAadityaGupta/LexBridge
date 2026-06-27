/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.jsx",
    "./App.jsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0F1117',
        surface: '#F7F8FC',
        card: '#FFFFFF',
        accent: '#2D3A8C',
        'accent-light': '#EEF0FA',
        muted: '#6B7280',
        border: '#E5E7EB',
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
        md: '12px',
        lg: '20px',
      },
    },
  },
  plugins: [],
}
