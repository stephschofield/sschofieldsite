"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Home,
  User,
  Briefcase,
  Mail,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Search,
  Calendar,
  Settings,
} from "lucide-react"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline-flex">Search...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/#about"))}>
              <User className="mr-2 h-4 w-4" />
              <span>About</span>
              <CommandShortcut>⌘A</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Projects</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/#contact"))}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Contact</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            <CommandItem onSelect={() => runCommand(() => router.push("/projects/flowspace"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Flowspace</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/projects/mindfull"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Mindfull</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/projects/palette"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Palette</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/projects/typeform"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Typeform</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Social">
            <CommandItem onSelect={() => runCommand(() => window.open("https://github.com", "_blank"))}>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("https://linkedin.com", "_blank"))}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("https://twitter.com", "_blank"))}>
              <Twitter className="mr-2 h-4 w-4" />
              <span>Twitter</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Utilities">
            <CommandItem onSelect={() => runCommand(() => router.push("/schedule"))}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Schedule a Call</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
