"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

export default function FeatureCarousel() {
  const features = [
    {
      title: "Minimal Design",
      description: "Clean aesthetics that put your content in the spotlight.",
      icon: "✨",
    },
    {
      title: "Responsive",
      description: "Flawless experiences across all devices and screen sizes.",
      icon: "📱",
    },
    {
      title: "Fast Performance",
      description: "Lightning-quick load times for smooth user interactions.",
      icon: "⚡",
    },
    {
      title: "Accessibility",
      description: "Inclusive design practices for all users.",
      icon: "🌈",
    },
    {
      title: "SEO Optimized",
      description: "Built to help your site rank higher in search results.",
      icon: "🔍",
    },
  ]

  const [width, setWidth] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const carousel = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Calculate width after component is mounted on client
  useEffect(() => {
    if (isClient && carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [isClient])

  // Handle resize
  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isClient])

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x < -100 || velocity.x < -0.5

    if (swipe) {
      controls.start({ x: -width, transition: { type: "spring", stiffness: 300, damping: 30 } })
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } })
    }
  }

  return (
    <div className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose Us</h2>
        {isClient && (
          <motion.div ref={carousel} className="cursor-grab overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              whileTap={{ cursor: "grabbing" }}
              animate={controls}
              onDragEnd={handleDragEnd}
              className="flex"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="min-w-[300px] h-[400px] p-8 m-4 bg-background rounded-3xl shadow-lg flex flex-col justify-between hover-lift transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary/10"
                >
                  <div>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                  <div className="mt-4">
                    <a
                      href="https://www.flowersandsaints.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Learn more →
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
