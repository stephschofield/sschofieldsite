"use client"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PortfolioGrid from "@/components/PortfolioGrid"
import { motion } from "framer-motion"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <motion.section
          className="py-16 px-4 md:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">My Portfolio</h1>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                A collection of my recent work across web development, mobile applications, and design solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PortfolioGrid />
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
