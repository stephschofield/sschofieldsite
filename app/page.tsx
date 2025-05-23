"use client"

import { useState } from "react"
import ParticleHero from "@/components/ParticleHero"
import Header from "@/components/Header"
import PortfolioGrid from "@/components/PortfolioGrid"
import Footer from "@/components/Footer"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false)
  const { toast } = useToast()

  const handleExploreClick = () => {
    try {
      console.log("Explore button clicked")
      setShowPortfolio(true)

      // Scroll to portfolio section
      setTimeout(() => {
        const portfolioSection = document.getElementById("portfolio-section")
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)

      // Show toast notification
      toast({
        title: "Welcome to my portfolio!",
        description: "Feel free to explore my projects and get in touch.",
      })
    } catch (error) {
      console.error("Error in handleExploreClick:", error)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <ParticleHero onExploreClick={handleExploreClick} />

      {/* Portfolio Section */}
      <section id="portfolio-section" className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My Portfolio</h2>
          <PortfolioGrid />
        </div>
      </section>

      <Footer />
    </main>
  )
}
