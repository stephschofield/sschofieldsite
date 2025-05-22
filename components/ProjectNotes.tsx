"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Save, Clock } from "lucide-react"

interface ProjectNotesProps {
  projectId: string
  initialNotes?: string
}

export function ProjectNotes({ projectId, initialNotes = "" }: ProjectNotesProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Auto-save effect
  useEffect(() => {
    if (!isAutoSaveEnabled) return

    const autoSaveTimer = setTimeout(() => {
      if (notes !== initialNotes) {
        saveNotes()
      }
    }, 3000) // Auto-save after 3 seconds of inactivity

    return () => clearTimeout(autoSaveTimer)
  }, [notes, isAutoSaveEnabled, initialNotes])

  const saveNotes = async () => {
    if (isSaving) return

    setIsSaving(true)
    // Simulate API call to save notes
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      // In a real app, you would save to a database here
      console.log("Saving notes for project", projectId, notes)

      setLastSaved(new Date())
      toast({
        title: "Notes saved",
        description: "Your project notes have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error saving notes",
        description: "There was a problem saving your notes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="project-notes" className="text-base font-medium">
          Project Notes
        </Label>
        {lastSaved && (
          <div className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        )}
      </div>

      <Textarea
        id="project-notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add your project notes, ideas, and reminders here..."
        className="min-h-[200px] font-mono text-sm"
      />

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="auto-save"
            checked={isAutoSaveEnabled}
            onChange={(e) => setIsAutoSaveEnabled(e.target.checked)}
            className="rounded border-gray-300"
          />
          <Label htmlFor="auto-save" className="text-sm font-normal cursor-pointer">
            Auto-save
          </Label>
        </div>

        <Button onClick={saveNotes} disabled={isSaving || notes === initialNotes}>
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Notes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
