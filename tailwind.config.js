const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.5s linear forwards',
        marquee: 'marquee var(--marquee-duration) linear infinite',
        'spin-slow': 'spin 4s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'spin-reverse-slow': 'spin-reverse 4s linear infinite',
        'spin-reverse-slower': 'spin-reverse 6s linear infinite',
      },
      backgroundImage: {
        'home-hero': "linear-gradient(to bottom, #99cbc8, #262b2d),  url('/home-hero-bg.jpg')",
      },
      colors: {
        primary: '#262b2d', // blue main
        secondary: '#99cbc8', // light blue main
        blue: {
          DEFAULT: '#262b2d',
          50: '#939596',
          100: '#7d8081',
          200: '#676b6c',
          300: '#515557',
          400: '#3c4042',
          500: '#262b2d',
          600: '#222729',
          700: '#1e2224',
          800: '#1b1e1f',
          900: '#171a1b',
        },
        red: {
          DEFAULT: '#d22c45',
          50: '#e996a2',
          100: '#e4808f',
          200: '#e06b7d',
          300: '#db566a',
          400: '#d74158',
          500: '#d22c45',
          600: '#bd283e',
          700: '#a82337',
          800: '#931f30',
          900: '#7e1a29',
        },
        white: {
          DEFAULT: '#f8f8f6',
          50: '#fcfcfb',
          100: '#fbfbfa',
          200: '#fafaf9',
          300: '#f9f9f8',
          400: '#f9f9f7',
          500: '#f8f8f6',
          600: '#dfdfdd',
          700: '#c6c6c5',
          800: '#aeaeac',
          900: '#959594',
        },
        'light-blue': {
          DEFAULT: '#99cbc8',
          50: '#cce5e4',
          100: '#c2e0de',
          200: '#b8dbd9',
          300: '#add5d3',
          400: '#a3d0ce',
          500: '#99cbc8',
          600: '#8ab7b4',
          700: '#7aa2a0',
          800: '#6b8e8c',
          900: '#5c7a78',
        },
      },
      fontFamily: {
        body: ['var(--font-body)', ...fontFamily.sans],
        headline: ['var(--font-heading)', ...fontFamily.serif],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.5rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '2rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['2rem', { lineHeight: '3rem' }],
        '4xl': ['2.5rem', { lineHeight: '3rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
