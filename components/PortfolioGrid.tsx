"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"

const projects = [
  {
    id: 1,
    title: "Productivity Dashboard",
    category: "Web App",
    image: "/productivity-app-dashboard.png",
    link: "/projects/productivity-dashboard",
  },
  {
    id: 2,
    title: "Meditation App",
    category: "Mobile App",
    image: "/meditation-app-dashboard.png",
    link: "/projects/meditation-app",
  },
  {
    id: 3,
    title: "Fashion Boutique Website",
    category: "E-commerce",
    image: "/fashion-boutique-website.png",
    link: "/projects/fashion-boutique",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    category: "Web App",
    image: "/analytics-dashboard.png",
    link: "/projects/analytics-dashboard",
  },
  {
    id: 5,
    title: "Productivity Mobile App",
    category: "Mobile App",
    image: "/productivity-app-mobile.png",
    link: "/projects/productivity-mobile",
  },
  {
    id: 6,
    title: "Meditation Session",
    category: "Mobile App",
    image: "/meditation-app-session.png",
    link: "/projects/meditation-session",
  },
]

const categories = ["All", "Web App", "Mobile App", "E-commerce"]

export default function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === selectedCategory))
    }
  }, [selectedCategory])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Portfolio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my recent projects and see how I can help bring your ideas to life
          </p>
        </div>

        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={item} className="group">
              <a href={project.link} className="block">
                <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-blue-600 font-medium">{project.category}</span>
                    <h3 className="text-xl font-bold mt-1">{project.title}</h3>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
