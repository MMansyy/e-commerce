/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'logo-cloud': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - 4rem))' },
        },
      },
      animation: {
        'logo-cloud': 'logo-cloud 90s linear infinite', // Adjust duration and timing as needed for your design.
      },
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