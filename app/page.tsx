"use client"

import type React from "react"

import { useState } from "react"
import ParticleHero from "@/components/ParticleHero"
import Header from "@/components/Header"
import PortfolioGrid from "@/components/PortfolioGrid"
import Footer from "@/components/Footer"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Phone, MapPin } from "lucide-react"

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false)
  const { toast } = useToast()
  const [formSubmitted, setFormSubmitted] = useState(false)

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    })
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

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 md:px-8 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Contact Information</h3>
              <p className="text-muted-foreground">
                Feel free to reach out to me for collaborations, questions, or just to say hello!
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>stephanie@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background rounded-lg p-6 shadow-sm">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Your message has been sent successfully.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setFormSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" required />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message" rows={4} required />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
