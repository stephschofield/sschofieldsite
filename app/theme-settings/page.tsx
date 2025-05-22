"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Palette, Settings, Code, Wand2 } from "lucide-react"
import { ThemeShowcase } from "@/components/ThemeShowcase"
import { ThemeUtilsDemo } from "@/components/ThemeUtilsDemo"

export default function ThemeSettingsPage() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-muted rounded mb-6"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Theme Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Theme Settings</h1>
        </div>

        <Tabs defaultValue="showcase" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="showcase" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Theme Showcase</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="utilities" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              <span>Utilities</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>CSS Variables</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="showcase">
            <ThemeShowcase />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Theme Configuration</CardTitle>
                <CardDescription>
                  Current theme: <span className="font-medium">{resolvedTheme}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your theme settings are stored in your browser's local storage. You can change your theme using the
                  theme switcher in the header.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utilities">
            <ThemeUtilsDemo />
          </TabsContent>

          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle>CSS Variables</CardTitle>
                <CardDescription>
                  These CSS variables define the colors used in the {resolvedTheme} theme.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                  {`/* ${resolvedTheme === "dark" ? "Dark" : "Light"} Theme Variables */

:root {
  --background: ${resolvedTheme === "dark" ? "0 0% 3.9%" : "0 0% 100%"};
  --foreground: ${resolvedTheme === "dark" ? "0 0% 98%" : "0 0% 3.9%"};
  --card: ${resolvedTheme === "dark" ? "0 0% 3.9%" : "0 0% 100%"};
  --card-foreground: ${resolvedTheme === "dark" ? "0 0% 98%" : "0 0% 3.9%"};
  --popover: ${resolvedTheme === "dark" ? "0 0% 3.9%" : "0 0% 100%"};
  --popover-foreground: ${resolvedTheme === "dark" ? "0 0% 98%" : "0 0% 3.9%"};
  --primary: ${resolvedTheme === "dark" ? "0 0% 98%" : "0 0% 9%"};
  --primary-foreground: ${resolvedTheme === "dark" ? "0 0% 9%" : "0 0% 98%"};
  --secondary: ${resolvedTheme === "dark" ? "0 0% 14.9%" : "0 0% 96.1%"};
  --secondary-foreground: ${resolvedTheme === "dark" ? "0 0% 98%" : "0 0% 9%"};
  --muted: ${resolvedTheme === "dark" ? "0 0% 14.9%" : "0 0% 96.1%"};
  --muted-foreground: ${resolvedTheme === "dark" ? "0 0% 63.9%" : "0 0% 45.1%"};
  --accent: ${resolvedTheme === "dark" ? "0 0% 14.9%" : "0 0% 96.1%"};
  --accent-foreground: ${resolvedTheme === "dark" ? "0 0% 98%" : "0 0% 9%"};
  --destructive: ${resolvedTheme === "dark" ? "0 62.8% 30.6%" : "0 84.2% 60.2%"};
  --destructive-foreground: ${resolvedTheme === "dark" ? "0 0% 98%" : "0 0% 98%"};
  --border: ${resolvedTheme === "dark" ? "0 0% 14.9%" : "0 0% 89.8%"};
  --input: ${resolvedTheme === "dark" ? "0 0% 14.9%" : "0 0% 89.8%"};
  --ring: ${resolvedTheme === "dark" ? "0 0% 83.1%" : "0 0% 3.9%"};
  
  /* Chart Colors */
  --chart-1: ${resolvedTheme === "dark" ? "220 70% 50%" : "12 76% 61%"};
  --chart-2: ${resolvedTheme === "dark" ? "160 60% 45%" : "173 58% 39%"};
  --chart-3: ${resolvedTheme === "dark" ? "30 80% 55%" : "197 37% 24%"};
  --chart-4: ${resolvedTheme === "dark" ? "280 65% 60%" : "43 74% 66%"};
  --chart-5: ${resolvedTheme === "dark" ? "340 75% 55%" : "27 87% 67%"};
  
  /* Sidebar Colors */
  --sidebar-background: ${resolvedTheme === "dark" ? "240 5.9% 10%" : "0 0% 98%"};
  --sidebar-foreground: ${resolvedTheme === "dark" ? "240 4.8% 95.9%" : "240 5.3% 26.1%"};
  --sidebar-primary: ${resolvedTheme === "dark" ? "224.3 76.3% 48%" : "240 5.9% 10%"};
  --sidebar-primary-foreground: ${resolvedTheme === "dark" ? "0 0% 100%" : "0 0% 98%"};
  --sidebar-accent: ${resolvedTheme === "dark" ? "240 3.7% 15.9%" : "240 4.8% 95.9%"};
  --sidebar-accent-foreground: ${resolvedTheme === "dark" ? "240 4.8% 95.9%" : "240 5.9% 10%"};
  --sidebar-border: ${resolvedTheme === "dark" ? "240 3.7% 15.9%" : "220 13% 91%"};
  --sidebar-ring: ${resolvedTheme === "dark" ? "217.2 91.2% 59.8%" : "217.2 91.2% 59.8%"};
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
