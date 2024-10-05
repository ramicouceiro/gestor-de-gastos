/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: 'rgb(229 231 235)',
  			foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "click": {
          from: {
            'box-shadow': '7px 7px 15px #b8b9be, -7px -7px 15px #ffffff'
          },
          '50%': {
            // 'box-shadow': '3px 3px 7px #b8b9be, -3px -3px 7px #ffffff'
            'box-shadow': 'none'
          },
          to: {
            // 'box-shadow': 'none'
            'box-shadow': '7px 7px 15px #b8b9be, -7px -7px 15px #ffffff'
          },
        },
    },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "click": "click 2s ease-out infinite",
      },
      boxShadow: {
  			neomorphic: '7px 7px 15px #b8b9be, -7px -7px 15px #ffffff',
  			neomorphicInset: 'inset 7px 7px 15px #b8b9be, inset -7px -7px 15px #ffffff',
  			neomorphicDark: '15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60)',
  			neomorphicInsetDark: 'inset 5px 5px 10px #0a0a0a, inset -5px -5px 10px #1e1e1e',
			  neomorphicBtn: '10px 10px 20px #c5c5c5, -10px -10px 20px #fff',
  		},
    },
  },
  plugins: [],
}

