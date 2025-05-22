"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function TabbedTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      role: "CEO, TechCorp",
      content:
        "Working with Stephanie was a game-changer for our brand. Her minimalist approach to design perfectly captured our essence while providing a seamless user experience. The results exceeded our expectations.",
      image: "/diverse-group.png",
    },
    {
      id: 2,
      name: "John Smith",
      role: "Marketing Director, Innovate Inc",
      content:
        "Stephanie's attention to detail and understanding of our brand values made the collaboration incredibly smooth. The website she designed has significantly improved our conversion rates and user engagement.",
      image: "/diverse-group.png",
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Founder, Bloom Studios",
      content:
        "I was blown away by Stephanie's ability to translate our vision into a beautiful, functional design. Her process is thorough, and she truly listens to understand the core of what we needed.",
      image: "/diverse-group.png",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What Clients Say</h2>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-secondary/20 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={testimonials[activeIndex].image || "/placeholder.svg"}
                  alt={testimonials[activeIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-lg italic mb-6">{testimonials[activeIndex].content}</p>
              <h3 className="font-semibold text-lg">{testimonials[activeIndex].name}</h3>
              <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
            </motion.div>
          </AnimatePresence>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center"
            onClick={() => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center"
            onClick={() => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
