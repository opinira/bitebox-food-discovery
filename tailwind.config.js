/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#171A19',
          deep: '#0E100F',
          light: '#242927',
          surface: '#1D2120',
        },
        ivory: {
          DEFAULT: '#F7F3EB',
          warm: '#FBF9F5',
          soft: '#EFEAE0',
          darker: '#E7E0D3',
        },
        orange: {
          brand: '#E96B36',
          hover: '#D45722',
          light: '#FBE9E1',
          subtle: '#FFF5F0',
        },
        beige: {
          muted: '#D9C9AF',
          light: '#ECE3D4',
        },
        subtext: '#77736A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"DM Serif Display"', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 26, 25, 0.05)',
        'medium': '0 10px 30px -4px rgba(23, 26, 25, 0.08)',
        'elevated': '0 20px 40px -8px rgba(23, 26, 25, 0.12)',
        'card': '0 2px 12px rgba(23, 26, 25, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
