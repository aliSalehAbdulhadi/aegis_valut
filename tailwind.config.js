/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F4FD',
          100: '#B9DEF7',
          200: '#8AC8F1',
          300: '#5BB2EB',
          400: '#2C9CE5',
          500: '#0A7EA4',
          600: '#086583',
          700: '#064C62',
          800: '#043342',
          900: '#021A21',
        },
        navy: {
          50: '#E6E8EF',
          100: '#B3B8CC',
          200: '#8088A9',
          300: '#4D5886',
          400: '#1A2863',
          500: '#0D1B3E',
          600: '#0A1532',
          700: '#081025',
          800: '#050A19',
          900: '#03050C',
        },
        gold: {
          50: '#FFF8E6',
          100: '#FFEAB3',
          200: '#FFDC80',
          300: '#FFCE4D',
          400: '#FFC01A',
          500: '#D4A017',
          600: '#AA8012',
          700: '#80600E',
          800: '#554009',
          900: '#2B2005',
        },
        success: {
          50: '#E8F5E9',
          500: '#4CAF50',
          700: '#388E3C',
        },
        danger: {
          50: '#FFEBEE',
          500: '#F44336',
          700: '#D32F2F',
        },
        warning: {
          50: '#FFF3E0',
          500: '#FF9800',
          700: '#F57C00',
        },
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
