"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import FullScreenMenu from "./FullScreenMenu"
import { CommandMenu } from "./CommandMenu"
import { MainNav } from "./MainNav"
import { ProfileSheet } from "./ProfileSheet"
import { Separator } from "@/components/ui/separator"
import { ThemeSwitcher } from "./ThemeSwitcher"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Stephanie Schofield</span>
              <span className="text-xl font-bold">Stephanie Schofield</span>
            </Link>
          </div>

          <MainNav />

          <div className="flex items-center gap-4">
            <CommandMenu />
            <ThemeSwitcher variant="ghost" />
            <Separator orientation="vertical" className="h-6" />
            <ProfileSheet />
            <button className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
