"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X } from "lucide-react"

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.25 + i * 0.1,
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  }

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "#contact" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <div className="container mx-auto px-4 py-8 h-full flex flex-col">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <nav className="flex flex-col items-center space-y-8">
                {menuItems.map((item, i) => (
                  <motion.div key={item.title} custom={i} variants={itemVariants}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        className="text-4xl font-bold hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.preventDefault()
                          onClose()
                          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-4xl font-bold hover:text-primary transition-colors"
                        onClick={onClose}
                      >
                        {item.title}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
