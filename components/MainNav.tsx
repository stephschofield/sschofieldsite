"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <div className="hidden md:flex md:gap-x-6">
      {navItems.map((item) => {
        // For hash links (like #contact)
        if (item.href.startsWith("#")) {
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {item.name}
            </a>
          )
        }

        // For regular page links
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}
