"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:gap-x-6">
      {[
        ["Home", "/"],
        ["Portfolio", "/portfolio"],
        ["Projects", "/projects"],
        ["Contact", "#contact"],
      ].map(([title, url]) => (
        <Link
          key={url}
          href={url}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === url ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {title}
        </Link>
      ))}
    </div>
  )
}
