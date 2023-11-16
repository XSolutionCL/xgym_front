/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: { min: '300px', max: '430px'},
        xs: { min: '431px', max: '575px' }, // Mobile (iPhone 3 - iPhone XS Max).
        sm: { min: '576px', max: '897px' }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
        md: { min: '898px', max: '1199px' }, // Tablet (matches max: iPad Pro @ 1112px).
        lg: { min: '1200px' }, // Desktop smallest.
        xl: { min: '1259px' }, // Desktop wide.
        xxl: { min: '1359px' } // Desktop widescreen.
      },
    },
  },
  plugins: [],
}