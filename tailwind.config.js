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
      extend: {
        fontFamily: {
          body: ['var(--font-body)', ...fontFamily.sans],
          headline: ['var(--font-heading)', ...fontFamily.serif],
        },
        colors: {
          priamry: '#262b2d', // blue main
          secondary: '#99cbc8', // light blue main
          blue: {
            50: '#939596',
            100: '#7d8081',
            200: '#676b6c',
            300: '#515557',
            400: '#3c4042',
            500: '#262b2d', // main
            600: '#222729',
            700: '#1e2224',
            800: '#1b1e1f',
            900: '#171a1b',
          },
          red: {
            50: '#e996a2',
            100: '#e4808f',
            200: '#e06b7d',
            300: '#db566a',
            400: '#d74158',
            500: '#d22c45', // main
            600: '#bd283e',
            700: '#a82337',
            800: '#931f30',
            900: '#7e1a29',
          },
          white: {
            50: '#fcfcfb',
            100: '#fbfbfa',
            200: '#fafaf9',
            300: '#f9f9f8',
            400: '#f9f9f7',
            500: '#f8f8f6', // main
            600: '#dfdfdd',
            700: '#c6c6c5',
            800: '#aeaeac',
            900: '#959594',
          },
          'light-blue': {
            50: '#cce5e4',
            100: '#c2e0de',
            200: '#b8dbd9',
            300: '#add5d3',
            400: '#a3d0ce',
            500: '#99cbc8', // main
            600: '#8ab7b4',
            700: '#7aa2a0',
            800: '#6b8e8c',
            900: '#5c7a78',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
