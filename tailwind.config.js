/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Center the container (like Bootstrap)
        padding: '1rem', // Add default padding
        screens: {
          sm: '540px',  // Match Bootstrap's sm breakpoint
          md: '720px',  // Match Bootstrap's md breakpoint
          lg: '960px',  // Match Bootstrap's lg breakpoint
          xl: '1140px', // Match Bootstrap's xl breakpoint
          '2xl': '1320px', // Optional: Match Bootstrap's 2xl breakpoint
        }
      }
    },
  },
  plugins: [],
}