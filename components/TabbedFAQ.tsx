"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function TabbedFAQ() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a comprehensive range of design services including UI/UX design, web development, branding, and digital marketing. Our approach focuses on minimalist, user-centered design that enhances the user experience while achieving your business goals.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on scope and complexity. A simple website redesign might take 4-6 weeks, while a comprehensive branding project could take 2-3 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements.",
    },
    {
      question: "What is your design process?",
      answer:
        "Our design process begins with discovery, where we learn about your business, goals, and users. We then move to research and strategy, followed by wireframing and prototyping. After design approval, we proceed to development, testing, and launch. Throughout the process, we maintain open communication and incorporate your feedback.",
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer:
        "Yes, we offer various maintenance and support packages to ensure your digital presence remains up-to-date and performs optimally. These can include regular updates, performance monitoring, content updates, and technical support.",
    },
    {
      question: "How do you price your services?",
      answer:
        "We offer both project-based and retainer pricing models. Project-based pricing is determined by the scope, complexity, and timeline of your specific needs. Retainer arrangements are ideal for ongoing work and provide a dedicated amount of our time each month. We'll provide detailed quotes after understanding your requirements.",
    },
  ]

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our services and process
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${activeIndex === index ? "transform rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 pt-0 text-muted-foreground">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
