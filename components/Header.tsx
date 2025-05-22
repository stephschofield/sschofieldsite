"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CommandMenu } from "@/components/CommandMenu"
import { ProfileSheet } from "@/components/ProfileSheet"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Stephanie Schofield
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/portfolio#about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/portfolio#skills" className="text-sm font-medium hover:text-primary">
              Skills
            </Link>
            <Link href="/portfolio#services" className="text-sm font-medium hover:text-primary">
              Services
            </Link>
            <Link href="/portfolio#portfolio" className="text-sm font-medium hover:text-primary">
              Portfolio
            </Link>
            <Link href="/portfolio#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>

          {/* Command Menu and Profile */}
          <div className="hidden md:flex items-center space-x-2">
            <CommandMenu />
            <ProfileSheet />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/portfolio#about"
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/portfolio#skills"
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </Link>
              <Link
                href="/portfolio#services"
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/portfolio#portfolio"
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/portfolio#contact"
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <div className="mt-4 flex items-center">
              <CommandMenu />
              <ProfileSheet />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
