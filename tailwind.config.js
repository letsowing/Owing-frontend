/** @type {import('tailwindcss').Config} */
import { Background } from 'reactflow'
import plugin from 'tailwindcss/plugin'

;``
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        beige: '#FDF8F3',
        darkbeige: '#FFECD8',
        orange: '#EF931A',
        redorange: '#FB5D2B',
        lightredorange: '#FF9060',
        blush: '#ff8080',

        whitegray: '#E8E8E8',
        verylightgray: '#F8F8F8',
        lightgray: '#CFCDCD',
        gray: '#676767',
        darkgray: '#333333',
        olive: '#AEE156',
        violet: '#A49AFF',

        // dark mode
        coldbeige: '#DDEBFF',
        skyblue: '#C3DCFE',
        cornflowerblue: '#809CFF',
        blue: '#3082F6',
        lightdarkgray: '#464646',
        darkblack: '#313236',
        verydarkblack: '#2B2D31',
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
      },
      animation: {
        slider: 'slider 30s linear infinite',
      },
      fontFamily: {
        sans: ['Noto Sans CJK KR', 'Arial', 'sans-serif'], // 기본 폰트 설정
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ nocompatible: true }),
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
