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
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavigation = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    console.log(`Navigating to: ${href}`) // Debug log

    if (href.startsWith("#")) {
      // For hash links (like #contact)
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    } else {
      // For page navigation
      // Try both methods for maximum compatibility
      router.push(href)

      // Fallback direct navigation after a short delay if router.push doesn't work
      setTimeout(() => {
        if (pathname === href) return // Don't redirect if we're already there
        window.location.href = href
      }, 100)
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
