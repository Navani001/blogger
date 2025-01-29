import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      boxShadow: {
				'light-xs': '0px 2px 4px rgba(0, 0, 0, 0.08)', // Extra small shadow
				'light-sm': '0px 4px 6px rgba(0, 0, 0, 0.1)', // Small shadow
				'light-md': '0px 6px 12px rgba(0, 0, 0, 0.15)', // Medium shadow
				'light-lg': '0px 8px 16px rgba(0, 0, 0, 0.2)', // Large shadow
				'light-xl': '0px 10px 24px rgba(0, 0, 0, 0.25)', // Extra large shadow
				'gradient-shadow':
					'0 4px 6px 0 rgba(255, 255, 255, 0.00), 0 6px 10px 2px rgba(255, 255, 255, 0.44)',
				'light-xll': '0px 20px 24px -4px #15151514', // Extra large shadow
				'light-xlll': '2px 2px 16px 0px rgba(0, 0, 0, 0.20)',
				
			},
     
    },
  },
  plugins: [nextui(),require('@tailwindcss/typography'),
    require('@nextui-org/react')],
} satisfies Config;


// tailwind.config.js