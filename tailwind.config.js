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
          sans: ['var(--font-family)', ...fontFamily.sans],
        },
        colors: {
          brandGreen: '#536135',
          brandOrange: '#FE5000',
          textWhite: '#F4F5F0',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
