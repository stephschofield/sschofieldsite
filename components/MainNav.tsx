"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (path.startsWith("#")) {
      document.querySelector(path)?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(path)
    }
  }

  return (
    <div className="hidden md:flex md:gap-x-6">
      {[
        ["Home", "/"],
        ["Portfolio", "/portfolio"],
        ["Projects", "/projects"],
        ["Contact", "#contact"],
      ].map(([title, url]) => (
        <a
          key={url}
          href={url}
          onClick={handleNavigation(url)}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
            pathname === url ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {title}
        </a>
      ))}
    </div>
  )
}
