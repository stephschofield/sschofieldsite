"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CommandMenu } from "@/components/CommandMenu"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { Menu, X } from "lucide-react"
import { MainNav } from "./MainNav"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    try {
      setMobileMenuOpen(!mobileMenuOpen)
    } catch (error) {
      console.error("Error in toggleMobileMenu:", error)
    }
  }

  const closeMobileMenu = () => {
    try {
      setMobileMenuOpen(false)
    } catch (error) {
      console.error("Error in closeMobileMenu:", error)
    }
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    closeMobileMenu()

    const contactElement = document.getElementById("contact")
    if (contactElement) {
      console.log("Scrolling to contact section")
      contactElement.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      console.warn("Contact section not found")

      // If we're not on the homepage, navigate to homepage first
      if (pathname !== "/") {
        router.push("/#contact")
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 pl-4">
            <span className="hidden font-bold sm:inline-block">Stephanie Schofield</span>
          </Link>
          <MainNav />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <ThemeSwitcher />

          <Button variant="ghost" className="md:hidden" size="icon" onClick={toggleMobileMenu}>
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
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={closeMobileMenu}
            >
              Portfolio
            </Link>
            <a
              href="#contact"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={handleContactClick}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
