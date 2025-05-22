import type { ClassValue } from "clsx"
import { cn } from "@/lib/utils"

// Types for theme management
export type ThemeMode = "light" | "dark" | "system"
export type ThemeColor = "default" | "blue" | "green" | "purple" | "custom"

export interface HSLColor {
  h: number // hue
  s: number // saturation
  l: number // lightness
}

export interface ThemeColors {
  [key: string]: HSLColor
}

export interface ThemeConfig {
  name: string
  mode: ThemeMode
  color: ThemeColor
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
}

// Parse HSL string from CSS variable (format: "0 0% 100%")
export function parseHSL(hslString: string): HSLColor {
  const [h, s, l] = hslString.split(" ").map((part) => {
    // Remove the % sign if present and parse as number
    return Number.parseFloat(part.replace("%", ""))
  })

  return { h, s, l }
}

// Convert HSL object to CSS string format
export function hslToString(hsl: HSLColor): string {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`
}

// Convert HSL to hex color (for color pickers)
export function hslToHex({ h, s, l }: HSLColor): string {
  // Convert HSL to RGB first
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  // Convert RGB to hex
  const toHex = (value: number) => {
    const hex = Math.round((value + m) * 255).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// Convert hex color to HSL (for color pickers)
export function hexToHSL(hex: string): HSLColor {
  // Remove the # if present
  hex = hex.replace(/^#/, "")

  // Parse the hex values
  let r = 0,
    g = 0,
    b = 0
  if (hex.length === 3) {
    r = Number.parseInt(hex[0] + hex[0], 16) / 255
    g = Number.parseInt(hex[1] + hex[1], 16) / 255
    b = Number.parseInt(hex[2] + hex[2], 16) / 255
  } else if (hex.length === 6) {
    r = Number.parseInt(hex.substring(0, 2), 16) / 255
    g = Number.parseInt(hex.substring(2, 4), 16) / 255
    b = Number.parseInt(hex.substring(4, 6), 16) / 255
  }

  // Find min and max values
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h = Math.round(h * 60)
  }

  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return { h, s, l }
}

// Get all CSS variables for the current theme
export function getThemeVariables(): Record<string, string> {
  if (typeof window === "undefined") return {}

  const styles = getComputedStyle(document.documentElement)
  const variables: Record<string, string> = {}

  // Get all CSS variables that start with --
  for (const key of styles) {
    if (key.startsWith("--")) {
      variables[key] = styles.getPropertyValue(key).trim()
    }
  }

  return variables
}

// Apply a theme by setting CSS variables
export function applyTheme(theme: ThemeConfig): void {
  if (typeof window === "undefined") return

  const root = document.documentElement
  const mode =
    theme.mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme.mode

  // Apply dark class if needed
  if (mode === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }

  // Apply color variables
  const colors = theme.colors[mode]
  for (const [variable, value] of Object.entries(colors)) {
    root.style.setProperty(`--${variable}`, hslToString(value))
  }

  // Save theme to localStorage
  localStorage.setItem("theme-config", JSON.stringify(theme))
}

// Load theme from localStorage
export function loadSavedTheme(): ThemeConfig | null {
  if (typeof window === "undefined") return null

  const saved = localStorage.getItem("theme-config")
  if (!saved) return null

  try {
    return JSON.parse(saved) as ThemeConfig
  } catch (e) {
    console.error("Failed to parse saved theme", e)
    return null
  }
}

// Generate contrast color (for accessibility)
export function getContrastColor(hsl: HSLColor): HSLColor {
  // If lightness is greater than 50%, return black, otherwise white
  return hsl.l > 50 ? { h: 0, s: 0, l: 0 } : { h: 0, s: 0, l: 100 }
}

// Check if a color has sufficient contrast for accessibility
export function hasGoodContrast(background: HSLColor, foreground: HSLColor): boolean {
  // Convert HSL to relative luminance
  const getLuminance = ({ h, s, l }: HSLColor) => {
    // This is a simplified approximation
    return l / 100
  }

  const bgLuminance = getLuminance(background)
  const fgLuminance = getLuminance(foreground)

  // Calculate contrast ratio
  const contrast = (Math.max(bgLuminance, fgLuminance) + 0.05) / (Math.min(bgLuminance, fgLuminance) + 0.05)

  // WCAG 2.0 requires a contrast ratio of at least 4.5:1 for normal text
  return contrast >= 4.5
}

// Generate a color palette from a base color
export function generatePalette(baseColor: HSLColor): ThemeColors {
  const palette: ThemeColors = {
    primary: baseColor,
    // Generate lighter and darker variants
    "primary-light": { ...baseColor, l: Math.min(baseColor.l + 20, 95) },
    "primary-dark": { ...baseColor, l: Math.max(baseColor.l - 20, 5) },
    // Generate a complementary color (opposite on the color wheel)
    complementary: { ...baseColor, h: (baseColor.h + 180) % 360 },
    // Generate analogous colors (adjacent on the color wheel)
    analogous1: { ...baseColor, h: (baseColor.h + 30) % 360 },
    analogous2: { ...baseColor, h: (baseColor.h + 330) % 360 },
    // Generate triadic colors (evenly spaced on the color wheel)
    triadic1: { ...baseColor, h: (baseColor.h + 120) % 360 },
    triadic2: { ...baseColor, h: (baseColor.h + 240) % 360 },
  }

  return palette
}

// Utility for conditional theme-based classes
export function themeClass(lightClasses: ClassValue, darkClasses: ClassValue, baseClasses: ClassValue = ""): string {
  return cn(
    baseClasses,
    "light:has-[.light] & dark:has-[.dark] &",
    lightClasses,
    "dark:has-[.dark] & light:has-[.light] &",
    darkClasses,
  )
}

// Predefined theme configurations
export const themePresets: Record<ThemeColor, ThemeConfig> = {
  default: {
    name: "Default",
    mode: "system",
    color: "default",
    colors: {
      light: {
        primary: { h: 0, s: 0, l: 9 },
        "primary-foreground": { h: 0, s: 0, l: 98 },
        secondary: { h: 0, s: 0, l: 96.1 },
        "secondary-foreground": { h: 0, s: 0, l: 9 },
        accent: { h: 0, s: 0, l: 96.1 },
        "accent-foreground": { h: 0, s: 0, l: 9 },
        "chart-1": { h: 12, s: 76, l: 61 },
        "chart-2": { h: 173, s: 58, l: 39 },
      },
      dark: {
        primary: { h: 0, s: 0, l: 98 },
        "primary-foreground": { h: 0, s: 0, l: 9 },
        secondary: { h: 0, s: 0, l: 14.9 },
        "secondary-foreground": { h: 0, s: 0, l: 98 },
        accent: { h: 0, s: 0, l: 14.9 },
        "accent-foreground": { h: 0, s: 0, l: 98 },
        "chart-1": { h: 220, s: 70, l: 50 },
        "chart-2": { h: 160, s: 60, l: 45 },
      },
    },
  },
  blue: {
    name: "Blue",
    mode: "system",
    color: "blue",
    colors: {
      light: {
        primary: { h: 221.2, s: 83.2, l: 53.3 },
        "primary-foreground": { h: 210, s: 40, l: 98 },
        secondary: { h: 210, s: 40, l: 96.1 },
        "secondary-foreground": { h: 222.2, s: 47.4, l: 11.2 },
        accent: { h: 210, s: 40, l: 96.1 },
        "accent-foreground": { h: 222.2, s: 47.4, l: 11.2 },
        "chart-1": { h: 221.2, s: 83.2, l: 53.3 },
        "chart-2": { h: 262.1, s: 83.3, l: 57.8 },
      },
      dark: {
        primary: { h: 217.2, s: 91.2, l: 59.8 },
        "primary-foreground": { h: 222.2, s: 47.4, l: 11.2 },
        secondary: { h: 217.2, s: 32.6, l: 17.5 },
        "secondary-foreground": { h: 210, s: 40, l: 98 },
        accent: { h: 217.2, s: 32.6, l: 17.5 },
        "accent-foreground": { h: 210, s: 40, l: 98 },
        "chart-1": { h: 217.2, s: 91.2, l: 59.8 },
        "chart-2": { h: 189.5, s: 100, l: 42.2 },
      },
    },
  },
  green: {
    name: "Green",
    mode: "system",
    color: "green",
    colors: {
      light: {
        primary: { h: 142.1, s: 76.2, l: 36.3 },
        "primary-foreground": { h: 355.7, s: 100, l: 97.3 },
        secondary: { h: 138, s: 75.5, l: 96.9 },
        "secondary-foreground": { h: 142.1, s: 76.2, l: 36.3 },
        accent: { h: 138, s: 75.5, l: 96.9 },
        "accent-foreground": { h: 142.1, s: 76.2, l: 36.3 },
        "chart-1": { h: 142.1, s: 76.2, l: 36.3 },
        "chart-2": { h: 173, s: 58, l: 39 },
      },
      dark: {
        primary: { h: 142.1, s: 70.6, l: 45.3 },
        "primary-foreground": { h: 144.9, s: 80.4, l: 10 },
        secondary: { h: 142.4, s: 30.3, l: 14.9 },
        "secondary-foreground": { h: 138, s: 75.5, l: 96.9 },
        accent: { h: 142.4, s: 30.3, l: 14.9 },
        "accent-foreground": { h: 138, s: 75.5, l: 96.9 },
        "chart-1": { h: 142.1, s: 70.6, l: 45.3 },
        "chart-2": { h: 173, s: 58, l: 39 },
      },
    },
  },
  purple: {
    name: "Purple",
    mode: "system",
    color: "purple",
    colors: {
      light: {
        primary: { h: 262.1, s: 83.3, l: 57.8 },
        "primary-foreground": { h: 0, s: 0, l: 100 },
        secondary: { h: 263.5, s: 67, l: 97.5 },
        "secondary-foreground": { h: 262.1, s: 83.3, l: 57.8 },
        accent: { h: 263.5, s: 67, l: 97.5 },
        "accent-foreground": { h: 262.1, s: 83.3, l: 57.8 },
        "chart-1": { h: 262.1, s: 83.3, l: 57.8 },
        "chart-2": { h: 221.2, s: 83.2, l: 53.3 },
      },
      dark: {
        primary: { h: 263.4, s: 70, l: 50.4 },
        "primary-foreground": { h: 0, s: 0, l: 100 },
        secondary: { h: 262.5, s: 48.1, l: 16.5 },
        "secondary-foreground": { h: 263.5, s: 67, l: 97.5 },
        accent: { h: 262.5, s: 48.1, l: 16.5 },
        "accent-foreground": { h: 263.5, s: 67, l: 97.5 },
        "chart-1": { h: 263.4, s: 70, l: 50.4 },
        "chart-2": { h: 221.2, s: 83.2, l: 53.3 },
      },
    },
  },
  custom: {
    name: "Custom",
    mode: "system",
    color: "custom",
    colors: {
      light: {
        primary: { h: 0, s: 0, l: 9 },
        "primary-foreground": { h: 0, s: 0, l: 98 },
        secondary: { h: 0, s: 0, l: 96.1 },
        "secondary-foreground": { h: 0, s: 0, l: 9 },
        accent: { h: 0, s: 0, l: 96.1 },
        "accent-foreground": { h: 0, s: 0, l: 9 },
        "chart-1": { h: 12, s: 76, l: 61 },
        "chart-2": { h: 173, s: 58, l: 39 },
      },
      dark: {
        primary: { h: 0, s: 0, l: 98 },
        "primary-foreground": { h: 0, s: 0, l: 9 },
        secondary: { h: 0, s: 0, l: 14.9 },
        "secondary-foreground": { h: 0, s: 0, l: 98 },
        accent: { h: 0, s: 0, l: 14.9 },
        "accent-foreground": { h: 0, s: 0, l: 98 },
        "chart-1": { h: 220, s: 70, l: 50 },
        "chart-2": { h: 160, s: 60, l: 45 },
      },
    },
  },
}
