"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useThemeUtils } from "@/hooks/use-theme-utils"
import { hslToString, generatePalette, type HSLColor } from "@/lib/theme-utils"

export function ThemeUtilsDemo() {
  const { getCssVar, hslToHex, hexToHSL } = useThemeUtils()
  const [hexColor, setHexColor] = useState("#3b82f6")
  const [hslColor, setHslColor] = useState<HSLColor>({ h: 217, s: 91, l: 60 })
  const [cssVarName, setCssVarName] = useState("primary")
  const [cssVarValue, setCssVarValue] = useState<HSLColor | null>(null)

  // Convert hex to HSL
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value
    setHexColor(hex)
    try {
      const hsl = hexToHSL(hex)
      setHslColor(hsl)
    } catch (error) {
      console.error("Invalid hex color", error)
    }
  }

  // Get CSS variable value
  const handleGetCssVar = () => {
    const value = getCssVar(cssVarName)
    setCssVarValue(value)
  }

  // Generate a color palette
  const colorPalette = generatePalette(hslColor)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Utilities Demo</CardTitle>
        <CardDescription>Explore the theme utility functions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="converters" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="converters">Color Converters</TabsTrigger>
            <TabsTrigger value="variables">CSS Variables</TabsTrigger>
            <TabsTrigger value="palette">Color Palette</TabsTrigger>
          </TabsList>

          <TabsContent value="converters" className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hex-color">Hex Color</Label>
                  <div className="flex gap-2">
                    <Input id="hex-color" value={hexColor} onChange={handleHexChange} className="font-mono" />
                    <div className="h-10 w-10 rounded-md" style={{ backgroundColor: hexColor }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>HSL Conversion</Label>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <p>h: {hslColor.h}</p>
                    <p>s: {hslColor.s}%</p>
                    <p>l: {hslColor.l}%</p>
                    <p className="mt-2">CSS: {hslToString(hslColor)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>HSL to Hex Conversion</Label>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <p>Input HSL: {hslToString(hslColor)}</p>
                    <p className="mt-2">Output Hex: {hslToHex(hslColor)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Color Preview</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className="h-20 rounded-md flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)` }}
                    >
                      HSL
                    </div>
                    <div
                      className="h-20 rounded-md flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: hexColor }}
                    >
                      HEX
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="variables" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="css-var-name">CSS Variable Name</Label>
                <div className="flex gap-2">
                  <Input
                    id="css-var-name"
                    value={cssVarName}
                    onChange={(e) => setCssVarName(e.target.value)}
                    placeholder="primary"
                  />
                  <Button onClick={handleGetCssVar}>Get Value</Button>
                </div>
              </div>

              {cssVarValue && (
                <div className="space-y-2">
                  <Label>CSS Variable Value</Label>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <p>
                      --{cssVarName}: {hslToString(cssVarValue)}
                    </p>
                    <p className="mt-2">
                      h: {cssVarValue.h}, s: {cssVarValue.s}%, l: {cssVarValue.l}%
                    </p>
                    <p className="mt-2">Hex: {hslToHex(cssVarValue)}</p>
                  </div>
                  <div
                    className="h-10 rounded-md mt-2"
                    style={{ backgroundColor: `hsl(${cssVarValue.h}, ${cssVarValue.s}%, ${cssVarValue.l}%)` }}
                  />
                </div>
              )}

              <div className="space-y-2 mt-4">
                <Label>Common CSS Variables</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["primary", "secondary", "accent", "background", "foreground"].map((name) => (
                    <Button
                      key={name}
                      variant="outline"
                      onClick={() => {
                        setCssVarName(name)
                        handleGetCssVar()
                      }}
                    >
                      {name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="palette" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Generated Color Palette</Label>
                <p className="text-sm text-muted-foreground">
                  Based on the base color: hsl({hslColor.h}, {hslColor.s}%, {hslColor.l}%)
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(colorPalette).map(([name, color]) => (
                  <div key={name} className="space-y-2">
                    <div
                      className="h-16 rounded-md"
                      style={{ backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)` }}
                    />
                    <div className="text-xs">
                      <p className="font-medium">{name}</p>
                      <p className="text-muted-foreground">
                        hsl({color.h}, {color.s}%, {color.l}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mt-4">
                <Label>Color Relationships</Label>
                <div className="bg-muted p-3 rounded-md text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Primary: The base color</li>
                    <li>Primary Light/Dark: Variations of the base color</li>
                    <li>Complementary: Opposite on the color wheel</li>
                    <li>Analogous: Adjacent on the color wheel</li>
                    <li>Triadic: Evenly spaced on the color wheel</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
