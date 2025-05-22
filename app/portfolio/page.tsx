"use client"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import AboutUs from "@/components/AboutUs"
import ServicesSection from "@/components/ServicesSection"
import PortfolioGrid from "@/components/PortfolioGrid"
import TabbedTestimonials from "@/components/TabbedTestimonials"
import EnhancedContactForm from "@/components/EnhancedContactForm"
import Marquee from "@/components/Marquee"
import NewsletterSubscribe from "@/components/NewsletterSubscribe"
import Timeline from "@/components/Timeline"
import FloatingActionButton from "@/components/FloatingActionButton"
import LottieSection from "@/components/LottieSection"
import Announcement from "@/components/Announcement"
import SkillsSection from "@/components/SkillsSection"
import TabbedFAQ from "@/components/TabbedFAQ"
import FeatureCarousel from "@/components/FeatureCarousel"
import WearYourStory from "@/components/WearYourStory"

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <Announcement />

      {/* About Section */}
      <div id="about">
        <AboutUs />
      </div>

      {/* Skills Section */}
      <div id="skills">
        <SkillsSection />
      </div>

      {/* Services Section */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* Lottie Animation Section */}
      <LottieSection />

      {/* Marquee Section */}
      <Marquee />

      {/* Portfolio Section */}
      <div id="portfolio">
        <PortfolioGrid />
      </div>

      {/* Wear Your Story Section */}
      <WearYourStory />

      {/* Feature Carousel */}
      <FeatureCarousel />

      {/* Testimonials Section */}
      <TabbedTestimonials />

      {/* Timeline Section */}
      <Timeline />

      {/* FAQ Section */}
      <TabbedFAQ />

      {/* Newsletter Section */}
      <NewsletterSubscribe />

      {/* Contact Section */}
      <div id="contact">
        <EnhancedContactForm />
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </>
  )
}
