"use client"

import { useRef, useState, useEffect } from "react"
import Header from "@/components/Header"
import AboutUs from "@/components/AboutUs"
import PortfolioGrid from "@/components/PortfolioGrid"
import EnhancedContactForm from "@/components/EnhancedContactForm"
import Footer from "@/components/Footer"
import Marquee from "@/components/Marquee"
import NewsletterSubscribe from "@/components/NewsletterSubscribe"
import Timeline from "@/components/Timeline"
import FloatingActionButton from "@/components/FloatingActionButton"
import LottieSection from "@/components/LottieSection"
import Announcement from "@/components/Announcement"
import SkillsSection from "@/components/SkillsSection"
import TabbedFAQ from "@/components/TabbedFAQ"
import Testimonials from "@/components/Testimonials"
import Services from "@/components/Services"
import ProductShowcase from "@/components/ProductShowcase"
import WearYourStory from "@/components/WearYourStory"

// Create a loading state component
function LoadingState() {
  return <div className="min-h-screen flex items-center justify-center">Loading...</div>
}

export default function Portfolio() {
  const [isMounted, setIsMounted] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <LoadingState />
  }

  return (
    <>
      <Header />
      <Announcement />

      {/* About Section */}
      <div ref={aboutRef} id="about">
        <AboutUs />
      </div>

      {/* Skills Section */}
      <div ref={skillsRef} id="skills">
        <SkillsSection />
      </div>

      {/* Services Section */}
      <div ref={servicesRef} id="services">
        <Services />
      </div>

      {/* Lottie Animation Section */}
      <LottieSection />

      {/* Marquee Section */}
      <Marquee />

      <ProductShowcase />

      {/* Portfolio Section */}
      <div ref={portfolioRef} id="portfolio">
        <PortfolioGrid />
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Timeline Section */}
      <Timeline />

      <WearYourStory />

      {/* FAQ Section */}
      <TabbedFAQ />

      {/* Newsletter Section */}
      <NewsletterSubscribe />

      {/* Contact Section */}
      <div id="contact" ref={contactRef}>
        <EnhancedContactForm />
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </>
  )
}
