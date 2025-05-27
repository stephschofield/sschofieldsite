"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavigation = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    console.log(`Navigating to: ${href}`) // Debug log

    if (href.startsWith("#")) {
      // For hash links (like #contact)
      const targetId = href.substring(1) // Remove the # character
      const element = document.getElementById(targetId)

      if (element) {
        console.log(`Scrolling to element with id: ${targetId}`)
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        console.warn(`Element with id ${targetId} not found`)

        // If we're not on the homepage, navigate to homepage first
        if (pathname !== "/") {
          router.push(`/${href}`)
        }
      }
    } else {
      // For page navigation
      try {
        router.push(href)
      } catch (error: any) {
        console.error("Navigation error:", error)
        window.location.href = href
      }
    }
  }

  return (
    <div className="hidden md:flex md:gap-x-6">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
            pathname === item.href ? "text-foreground" : "text-muted-foreground",
          )}
          onClick={handleNavigation(item.href)}
        >
          {item.name}
        </a>
      ))}
    </div>
  )
}
