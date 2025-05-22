"use client"

import { motion } from "framer-motion"
import LottieAnimation from "./LottieAnimation"

export default function LottieSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Creative Process</h2>
          <p className="mt-4 text-lg text-gray-600">A visual representation of how I approach design and development</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <LottieAnimation />
            <h3 className="text-xl font-semibold text-gray-900 text-center">Discovery</h3>
            <p className="text-gray-600 text-center">
              Understanding the problem space and gathering requirements through research and stakeholder interviews.
            </p>
          </div>
          <div className="space-y-4">
            <LottieAnimation />
            <h3 className="text-xl font-semibold text-gray-900 text-center">Design</h3>
            <p className="text-gray-600 text-center">
              Creating wireframes, prototypes, and visual designs that address user needs and business goals.
            </p>
          </div>
          <div className="space-y-4">
            <LottieAnimation />
            <h3 className="text-xl font-semibold text-gray-900 text-center">Development</h3>
            <p className="text-gray-600 text-center">
              Bringing designs to life with clean, efficient code and continuous iteration based on feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
