"use client"

import { useState, useEffect } from "react"
import { Paintbrush, Check, TimerResetIcon as Reset, Copy, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { useThemeUtils } from "@/hooks/use-theme-utils"
import type { ThemeColor, HSLColor } from "@/lib/theme-utils"

export function ThemeCustomizer() {
  const {
    resolvedTheme,
    activeThemeColor,
    mounted,
    applyThemeColor,
    resetTheme,
    getCssVar,
    updateThemeColor,
    hslToHex,
    hexToHSL,
    themePresets,
  } = useThemeUtils()

  const [open, setOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>("primary")
  const [colorValue, setColorValue] = useState<HSLColor>({ h: 0, s: 0, l: 0 })
  const { toast } = useToast()

  // Update color value when selected color changes
  useEffect(() => {
    if (mounted && selectedColor) {
      const color = getCssVar(selectedColor)
      if (color) {
        setColorValue(color)
      }
    }
  }, [selectedColor, mounted, getCssVar])

  // Apply a predefined theme
  const handleApplyTheme = (themeColor: ThemeColor) => {
    applyThemeColor(themeColor)

    toast({
      title: "Theme Applied",
      description: `${themePresets[themeColor].name} theme has been applied.`,
    })
  }

  // Reset to default theme
  const handleResetTheme = () => {
    resetTheme()

    toast({
      title: "Theme Reset",
      description: "Theme has been reset to default.",
    })
  }

  // Update color values with sliders
  const handleColorChange = (type: "h" | "s" | "l", value: number[]) => {
    const newColor = { ...colorValue, [type]: value[0] }
    setColorValue(newColor)
    updateThemeColor(selectedColor, newColor)
  }

  // Save current theme as CSS
  const saveThemeAsCSS = () => {
    const theme = themePresets[activeThemeColor]
    if (!theme) return

    let css = `:root {\n`
    Object.entries(theme.colors.light).forEach(([key, value]) => {
      css += `  --${key}: ${value.h} ${value.s}% ${value.l}%;\n`
    })
    css += `}\n\n.dark {\n`
    Object.entries(theme.colors.dark).forEach(([key, value]) => {
      css += `  --${key}: ${value.h} ${value.s}% ${value.l}%;\n`
    })
    css += `}`

    // Copy to clipboard
    navigator.clipboard.writeText(css).then(() => {
      toast({
        title: "CSS Copied",
        description: "Theme CSS has been copied to clipboard.",
      })
    })
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Paintbrush className="h-4 w-4" />
        <span className="sr-only">Customize theme</span>
      </Button>
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Paintbrush className="h-4 w-4" />
            <span className="sr-only">Customize theme</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Customize Theme</DialogTitle>
            <DialogDescription>Choose a predefined theme or customize your own colors.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="preset" className="mt-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="preset">Preset Themes</TabsTrigger>
              <TabsTrigger value="custom">Custom Colors</TabsTrigger>
            </TabsList>

            <TabsContent value="preset" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(themePresets)
                  .filter(([key]) => key !== "custom")
                  .map(([key, theme]) => (
                    <Button
                      key={key}
                      variant={activeThemeColor === key ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleApplyTheme(key as ThemeColor)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{
                            backgroundColor: `hsl(${theme.colors.light.primary.h} ${theme.colors.light.primary.s}% ${theme.colors.light.primary.l}%)`,
                          }}
                        />
                        {theme.name}
                        {activeThemeColor === key && <Check className="h-4 w-4 ml-auto" />}
                      </div>
                    </Button>
                  ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Preview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="space-y-1.5">
                      <Label>Light Mode</Label>
                      <div className="flex gap-2">
                        {Object.entries(themePresets[activeThemeColor].colors.light)
                          .slice(0, 3)
                          .map(([key, color]) => (
                            <div
                              key={key}
                              className="h-10 w-10 rounded-full"
                              style={{
                                backgroundColor: `hsl(${color.h} ${color.s}% ${color.l}%)`,
                              }}
                              title={key}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-1.5">
                      <Label>Dark Mode</Label>
                      <div className="flex gap-2">
                        {Object.entries(themePresets[activeThemeColor].colors.dark)
                          .slice(0, 3)
                          .map(([key, color]) => (
                            <div
                              key={key}
                              className="h-10 w-10 rounded-full"
                              style={{
                                backgroundColor: `hsl(${color.h} ${color.s}% ${color.l}%)`,
                              }}
                              title={key}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="py-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Color to Customize</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["primary", "secondary", "accent", "chart-1", "chart-2"].map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        className="h-10"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Hue ({colorValue.h})</Label>
                    <div
                      className="h-6 w-6 rounded-full"
                      style={{
                        backgroundColor: `hsl(${colorValue.h}, ${colorValue.s}%, ${colorValue.l}%)`,
                      }}
                    />
                  </div>
                  <Slider
                    defaultValue={[colorValue.h]}
                    max={360}
                    step={1}
                    value={[colorValue.h]}
                    onValueChange={(value) => handleColorChange("h", value)}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Hue"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Saturation ({colorValue.s}%)</Label>
                  <Slider
                    defaultValue={[colorValue.s]}
                    max={100}
                    step={1}
                    value={[colorValue.s]}
                    onValueChange={(value) => handleColorChange("s", value)}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Saturation"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Lightness ({colorValue.l}%)</Label>
                  <Slider
                    defaultValue={[colorValue.l]}
                    max={100}
                    step={1}
                    value={[colorValue.l]}
                    onValueChange={(value) => handleColorChange("l", value)}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Lightness"
                  />
                </div>

                <div className="pt-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="h-16 w-16 rounded-md"
                        style={{
                          backgroundColor: `hsl(${colorValue.h}, ${colorValue.s}%, ${colorValue.l}%)`,
                        }}
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Current Color</p>
                        <p className="text-xs text-muted-foreground">
                          HSL: {colorValue.h}, {colorValue.s}%, {colorValue.l}%
                        </p>
                        <p className="text-xs text-muted-foreground">HEX: {hslToHex(colorValue)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleResetTheme}>
                <Reset className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={saveThemeAsCSS}>
                <Copy className="h-4 w-4 mr-2" />
                Copy CSS
              </Button>
            </div>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Palette className="h-4 w-4" />
            <span className="sr-only">Theme options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Theme Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.entries(themePresets)
            .filter(([key]) => key !== "custom")
            .map(([key, theme]) => (
              <DropdownMenuItem key={key} onClick={() => handleApplyTheme(key as ThemeColor)}>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: `hsl(${theme.colors.light.primary.h} ${theme.colors.light.primary.s}% ${theme.colors.light.primary.l}%)`,
                    }}
                  />
                  {theme.name}
                  {activeThemeColor === key && <Check className="h-4 w-4 ml-auto" />}
                </div>
              </DropdownMenuItem>
            ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>Customize Theme</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
