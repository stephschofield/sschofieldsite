"use client"

import { useRef, useEffect, useState } from "react"
import lottie from "lottie-web"
import { motion, useInView } from "framer-motion"

export default function LottieSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<any>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const [lottieLoaded, setLottieLoaded] = useState(false)

  // Fix: Separate animation loading from state updates
  useEffect(() => {
    // Only load the animation once
    if (lottieRef.current && !lottieLoaded) {
      try {
        animationRef.current = lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: "https://assets5.lottiefiles.com/packages/lf20_iorpbol0.json",
        })

        // Set loaded state after animation is loaded
        animationRef.current.addEventListener("DOMLoaded", () => {
          setLottieLoaded(true)
        })
      } catch (error) {
        console.error("Error loading Lottie animation:", error)
      }
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
      }
    }
  }, []) // Empty dependency array - only run on mount

  // Fix: Separate effect for playing animation when in view
  useEffect(() => {
    if (isInView && lottieLoaded && animationRef.current) {
      animationRef.current.play()
    }
  }, [isInView, lottieLoaded])

  return (
    <section className="py-20 bg-white" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Creative Process</h2>
            <p className="text-gray-600 mb-6">
              My design and development process is collaborative and iterative. I work closely with clients to
              understand their needs and create solutions that exceed expectations.
            </p>
            <ul className="space-y-4">
              {[
                "Discovery and research",
                "Strategy and planning",
                "Design and prototyping",
                "Development and testing",
                "Launch and optimization",
              ].map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 rounded-xl p-6 h-[400px] flex items-center justify-center"
          >
            <div ref={lottieRef} className="w-full h-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
