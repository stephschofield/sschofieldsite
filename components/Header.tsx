"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CommandMenu } from "@/components/CommandMenu"
import { ProfileSheet } from "@/components/ProfileSheet"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 pl-4">
            <span className="hidden font-bold sm:inline-block">Stephanie Schofield</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/portfolio" className="transition-colors hover:text-foreground/80">
              Portfolio
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">
              About
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <ThemeSwitcher />
          <ProfileSheet />

          <Button variant="ghost" className="md:hidden" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="container pb-4 pt-2 md:hidden">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/portfolio"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
