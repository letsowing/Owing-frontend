/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        beige: '#FDF8F3',
        orange: '#EF931A',
        redorange: '#FB5D2B',
        lightredorange: '#FF9060',

        verylightgray: '#F8F8F8',
        lightgray: '#CFCDCD',
        gray: '#676767',
        darkgray: '#333333',
        olive: '#AEE156',
        violet: '#A49AFF',

        // dark mode
        coldbeige: '#F5F7FF',
        skyblue: '#C3DCFE',
        blue: '#3082F6',
        lightdarkgray: '#464646',
        darkblack: '#262627',
        verydarkblack: '#161616',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      keyframes: {
        slider: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // 왼쪽으로 전체 목록 이동
        },
        // slider: {
        //   '0%': {
        //     transform: 'translateX(0px)',
        //   },
        //   '100%': {
        //     transform: 'translateX(-1400px)',
        //   },
        // },
      },
      animation: {
        slider: 'slider 30s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
  ],
}
