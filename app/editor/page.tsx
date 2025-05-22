"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Home, Save, FileUp, Download, Trash, Copy, Settings, Share } from "lucide-react"

export default function EditorPage() {
  const router = useRouter()
  const [projectName, setProjectName] = useState("Untitled Project")
  const [projectDescription, setProjectDescription] = useState("")
  const [fontSize, setFontSize] = useState("16px")
  const [theme, setTheme] = useState("light")
  const [autoSave, setAutoSave] = useState(true)
  const [viewMode, setViewMode] = useState("edit")

  const handleSave = () => {
    console.log("Saving project:", { projectName, projectDescription, fontSize, theme, autoSave })
    // Simulate saving
    alert("Project saved successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumb className="px-6 py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Editor</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Menubar className="border-t border-b rounded-none px-2 lg:px-4">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handleSave}>
              Save <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Export <MenubarShortcut>⌘E</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => router.push("/projects")}>
              Close <MenubarShortcut>⌘W</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Cut <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Paste <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={viewMode} onValueChange={setViewMode}>
              <MenubarRadioItem value="edit">Edit Mode</MenubarRadioItem>
              <MenubarRadioItem value="preview">Preview Mode</MenubarRadioItem>
              <MenubarRadioItem value="split">Split View</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Font Size</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarRadioGroup value={fontSize} onValueChange={setFontSize}>
                  <MenubarRadioItem value="12px">Small</MenubarRadioItem>
                  <MenubarRadioItem value="16px">Medium</MenubarRadioItem>
                  <MenubarRadioItem value="20px">Large</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Theme</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarRadioGroup value={theme} onValueChange={setTheme}>
                  <MenubarRadioItem value="light">Light</MenubarRadioItem>
                  <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
                  <MenubarRadioItem value="system">System</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={autoSave} onCheckedChange={setAutoSave}>
              Auto Save
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>
              Preferences <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 px-4"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Project Editor</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <FileUp className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="text-lg font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea
                id="project-description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="min-h-[200px]"
                placeholder="Describe your project..."
                style={{ fontSize: fontSize }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Project Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <select
                    id="font-size"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="12px">Small (12px)</option>
                    <option value="16px">Medium (16px)</option>
                    <option value="20px">Large (20px)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <select
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="auto-save"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="auto-save">Auto Save</Label>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate Project
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
                <Button className="w-full justify-start text-destructive hover:text-destructive" variant="outline">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
