import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'; 

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        //main backroaud
        brandDark: '#050505',
        // blue
        brandBlue: '#2563eb',
        // cool white
        brandLight: '#f0f2f5', 
        // brutalan plava
        brandDeep: '#0a192f',
      },
      //  Custom Animacije
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
    }
  },

  plugins: [
    typography 
  ]
} as Config;