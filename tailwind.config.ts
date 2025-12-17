import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        // Kids palette
        kids: {
          green: "hsl(var(--kids-green))",
          "green-light": "hsl(var(--kids-green-light))",
          blue: "hsl(var(--kids-blue))",
          "blue-light": "hsl(var(--kids-blue-light))",
          yellow: "hsl(var(--kids-yellow))",
          "yellow-light": "hsl(var(--kids-yellow-light))",
          coral: "hsl(var(--kids-coral))",
          "coral-light": "hsl(var(--kids-coral-light))",
          bg: "hsl(var(--kids-bg))",
        },
        // Adults palette
        adults: {
          green: "hsl(var(--adults-green))",
          emerald: "hsl(var(--adults-emerald))",
          teal: "hsl(var(--adults-teal))",
          beige: "hsl(var(--adults-beige))",
          gold: "hsl(var(--adults-gold))",
          "gold-light": "hsl(var(--adults-gold-light))",
          bg: "hsl(var(--adults-bg))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        'kids': '0 10px 40px -10px rgba(123, 198, 126, 0.3)',
        'kids-lg': '0 20px 60px -15px rgba(123, 198, 126, 0.4)',
        'adults': '0 10px 40px -10px rgba(26, 77, 46, 0.15)',
        'adults-lg': '0 20px 60px -15px rgba(26, 77, 46, 0.2)',
        'gold': '0 10px 40px -10px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
