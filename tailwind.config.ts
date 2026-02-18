import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'; 

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
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