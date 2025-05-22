"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import {
  type ThemeMode,
  type ThemeColor,
  type ThemeConfig,
  type HSLColor,
  parseHSL,
  hslToString,
  hslToHex,
  hexToHSL,
  applyTheme,
  loadSavedTheme,
  themePresets,
} from "@/lib/theme-utils"

export function useThemeUtils() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeThemeColor, setActiveThemeColor] = useState<ThemeColor>("default")
  const [customColors, setCustomColors] = useState<{
    light: Record<string, HSLColor>
    dark: Record<string, HSLColor>
  }>({
    light: {},
    dark: {},
  })

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Load saved theme if exists
    const savedTheme = loadSavedTheme()
    if (savedTheme) {
      setActiveThemeColor(savedTheme.color)
      if (savedTheme.color === "custom") {
        setCustomColors(savedTheme.colors)
      }

      // Apply the saved theme mode
      if (savedTheme.mode !== "system") {
        setTheme(savedTheme.mode)
      }
    }
  }, [setTheme])

  // Apply a predefined theme
  const applyThemeColor = (themeColor: ThemeColor) => {
    if (!mounted) return

    const themeConfig = themePresets[themeColor]
    if (!themeConfig) return

    // Update the theme mode if it's not system
    if (themeConfig.mode !== "system") {
      setTheme(themeConfig.mode)
    }

    // Apply the theme colors
    applyTheme(themeConfig)
    setActiveThemeColor(themeColor)

    return themeConfig
  }

  // Apply a custom theme
  const applyCustomTheme = (colors: { light: Record<string, HSLColor>; dark: Record<string, HSLColor> }) => {
    if (!mounted) return

    const customTheme: ThemeConfig = {
      ...themePresets.custom,
      colors,
    }

    applyTheme(customTheme)
    setActiveThemeColor("custom")
    setCustomColors(colors)

    return customTheme
  }

  // Update a specific color in the current theme
  const updateThemeColor = (
    colorName: string,
    color: HSLColor,
    mode: ThemeMode = (resolvedTheme as ThemeMode) || "light",
  ) => {
    if (!mounted) return

    // Create a copy of the current theme
    const currentTheme =
      activeThemeColor === "custom"
        ? { ...themePresets.custom, colors: customColors }
        : { ...themePresets[activeThemeColor] }

    // Update the color
    const newColors = {
      ...currentTheme.colors,
      [mode]: {
        ...currentTheme.colors[mode],
        [colorName]: color,
      },
    }

    // Apply the updated theme
    const updatedTheme: ThemeConfig = {
      ...currentTheme,
      color: "custom", // Mark as custom when a color is changed
      colors: newColors,
    }

    applyTheme(updatedTheme)
    setActiveThemeColor("custom")
    setCustomColors(newColors)

    return updatedTheme
  }

  // Reset to default theme
  const resetTheme = () => {
    if (!mounted) return

    // Apply the default theme
    applyThemeColor("default")
    setTheme("system")
  }

  // Get CSS variable value
  const getCssVar = (name: string): HSLColor | null => {
    if (typeof window === "undefined" || !mounted) return null

    const value = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim()

    if (!value) return null

    return parseHSL(value)
  }

  // Set CSS variable value
  const setCssVar = (name: string, value: HSLColor): void => {
    if (typeof window === "undefined" || !mounted) return

    document.documentElement.style.setProperty(`--${name}`, hslToString(value))
  }

  return {
    theme,
    setTheme,
    resolvedTheme: resolvedTheme as ThemeMode,
    activeThemeColor,
    customColors,
    mounted,
    applyThemeColor,
    applyCustomTheme,
    updateThemeColor,
    resetTheme,
    getCssVar,
    setCssVar,
    hslToHex,
    hexToHSL,
    themePresets,
  }
}
