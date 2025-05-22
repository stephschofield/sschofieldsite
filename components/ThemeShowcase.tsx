"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ThemeSwitcher } from "./ThemeSwitcher"

export function ThemeShowcase() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Theme Showcase: {resolvedTheme}</h2>
        <ThemeSwitcher />
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Base Colors</CardTitle>
                <CardDescription>The primary colors used throughout the interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Background</Label>
                    <div className="h-16 rounded-md bg-background border"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Foreground</Label>
                    <div className="h-16 rounded-md bg-foreground"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Card</Label>
                    <div className="h-16 rounded-md bg-card border"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Card Foreground</Label>
                    <div className="h-16 rounded-md bg-card-foreground"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>UI Colors</CardTitle>
                <CardDescription>Colors used for UI elements and components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary</Label>
                    <div className="h-16 rounded-md bg-primary"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Foreground</Label>
                    <div className="h-16 rounded-md bg-primary-foreground"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary</Label>
                    <div className="h-16 rounded-md bg-secondary"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Foreground</Label>
                    <div className="h-16 rounded-md bg-secondary-foreground"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accent Colors</CardTitle>
                <CardDescription>Colors used for accents and highlights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Accent</Label>
                    <div className="h-16 rounded-md bg-accent"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Foreground</Label>
                    <div className="h-16 rounded-md bg-accent-foreground"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Muted</Label>
                    <div className="h-16 rounded-md bg-muted"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Muted Foreground</Label>
                    <div className="h-16 rounded-md bg-muted-foreground"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utility Colors</CardTitle>
                <CardDescription>Colors used for specific purposes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Border</Label>
                    <div className="h-16 rounded-md border-4 border-border"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Input</Label>
                    <div className="h-16 rounded-md border-4 border-input"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Ring</Label>
                    <div className="h-16 rounded-md ring-4 ring-ring"></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Destructive</Label>
                    <div className="h-16 rounded-md bg-destructive"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="components" className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Button variants in the current theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default</Label>
                    <Button className="w-full">Default Button</Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary</Label>
                    <Button variant="secondary" className="w-full">
                      Secondary Button
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Outline</Label>
                    <Button variant="outline" className="w-full">
                      Outline Button
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Ghost</Label>
                    <Button variant="ghost" className="w-full">
                      Ghost Button
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Destructive</Label>
                    <Button variant="destructive" className="w-full">
                      Destructive Button
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Link</Label>
                    <Button variant="link" className="w-full">
                      Link Button
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cards</CardTitle>
                <CardDescription>Card examples in the current theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Nested Card</CardTitle>
                    <CardDescription>A card inside another card</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">This is a nested card component example.</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Chart Colors</CardTitle>
              <CardDescription>Colors used for charts and data visualization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label>Chart 1</Label>
                  <div className="h-16 rounded-md" style={{ backgroundColor: "hsl(var(--chart-1))" }}></div>
                </div>
                <div className="space-y-2">
                  <Label>Chart 2</Label>
                  <div className="h-16 rounded-md" style={{ backgroundColor: "hsl(var(--chart-2))" }}></div>
                </div>
                <div className="space-y-2">
                  <Label>Chart 3</Label>
                  <div className="h-16 rounded-md" style={{ backgroundColor: "hsl(var(--chart-3))" }}></div>
                </div>
                <div className="space-y-2">
                  <Label>Chart 4</Label>
                  <div className="h-16 rounded-md" style={{ backgroundColor: "hsl(var(--chart-4))" }}></div>
                </div>
                <div className="space-y-2">
                  <Label>Chart 5</Label>
                  <div className="h-16 rounded-md" style={{ backgroundColor: "hsl(var(--chart-5))" }}></div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-4">Example Chart (Simulated)</p>
                <div className="h-64 flex items-end gap-4 px-4">
                  <div className="h-[40%] w-12 rounded-t-md" style={{ backgroundColor: "hsl(var(--chart-1))" }}></div>
                  <div className="h-[65%] w-12 rounded-t-md" style={{ backgroundColor: "hsl(var(--chart-2))" }}></div>
                  <div className="h-[85%] w-12 rounded-t-md" style={{ backgroundColor: "hsl(var(--chart-3))" }}></div>
                  <div className="h-[55%] w-12 rounded-t-md" style={{ backgroundColor: "hsl(var(--chart-4))" }}></div>
                  <div className="h-[70%] w-12 rounded-t-md" style={{ backgroundColor: "hsl(var(--chart-5))" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
