"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const products = [
    {
      title: "Productivity App",
      description: "A task management application with calendar integration",
      image: "/productivity-app-interface.png",
    },
    {
      title: "Meditation App",
      description: "A mindfulness and meditation app with guided sessions",
      image: "/meditation-app-interface.png",
    },
    {
      title: "Color Palette Tool",
      description: "A tool for designers to create and manage color palettes",
      image: "/color-palette-tool.png",
    },
    {
      title: "Typography Tool",
      description: "A web application for testing and comparing typography",
      image: "/typography-tool-interface.png",
    },
  ]

  // Fix: Handle resize to update container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    // Initial width calculation
    updateWidth()

    // Use ResizeObserver if available
    if (typeof ResizeObserver !== "undefined") {
      resizeObserverRef.current = new ResizeObserver(updateWidth)
      if (containerRef.current) {
        resizeObserverRef.current.observe(containerRef.current)
      }
    } else {
      // Fallback to window resize event
      window.addEventListener("resize", updateWidth)
    }

    // Cleanup
    return () => {
      if (resizeObserverRef.current) {
        if (containerRef.current) {
          resizeObserverRef.current.unobserve(containerRef.current)
        }
        resizeObserverRef.current.disconnect()
      } else {
        window.removeEventListener("resize", updateWidth)
      }
    }
  }, []) // Empty dependency array - only run on mount

  // Fix: Handle auto-rotation
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Set new interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 5000)

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [products.length]) // Only re-run if products.length changes

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore some of my recent product designs and development work
          </p>
        </div>

        <div className="relative overflow-hidden" ref={containerRef}>
          <div className="flex justify-center">
            <motion.div
              className="flex"
              animate={{ x: -currentIndex * containerWidth }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  className="min-w-full px-4"
                  style={{ width: containerWidth ? containerWidth : "100%" }}
                >
                  <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                    <div className="relative h-[300px] md:h-[400px]">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-blue-600" : "bg-gray-300"}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
