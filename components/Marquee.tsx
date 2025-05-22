"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth)
    }
  }, [containerRef.current?.scrollWidth, containerRef.current?.offsetWidth])

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Technologies I Work With</h2>
        <div className="overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex items-center space-x-12"
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            initial={{ x: 0 }}
            animate={{ x: -width }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
          >
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "GraphQL",
              "Tailwind CSS",
              "Framer Motion",
              "Figma",
              "AWS",
              "Firebase",
              "MongoDB",
              "PostgreSQL",
            ].map((tech) => (
              <div
                key={tech}
                className="flex-shrink-0 bg-white rounded-lg shadow-md px-8 py-6 min-w-[200px] text-center"
              >
                <p className="font-medium text-lg">{tech}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
