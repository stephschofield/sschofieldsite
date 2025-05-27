"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ProjectCard } from "@/components/ProjectCard"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Define project data type
interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  category: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate fetching projects
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const projectsData = [
        {
          id: "1",
          title: "Contoso Data Products",
          description:
            "A comprehensive data products platform showcasing enterprise-level data solutions, analytics dashboards, and business intelligence tools with modern UI/UX design.",
          image: "/contoso-data-products-screenshot.png",
          tags: ["React", "Data Analytics", "Enterprise", "UI/UX"],
          link: "https://contoso-data-products.com/",
          category: "web",
        },
        {
          id: "2",
          title: "FitMix - Spotify Fitness App",
          description:
            "An innovative fitness application that integrates with Spotify to create personalized workout playlists, track fitness goals, and provide an engaging exercise experience.",
          image: "/fitmix-app-screenshot.png",
          tags: ["React", "Spotify API", "Fitness", "Music Integration"],
          link: "https://v0-spotify-fitness-app.vercel.app/",
          category: "web",
        },
        {
          id: "3",
          title: "Emily & Matthew's Wedding Site",
          description:
            "A beautiful, personalized wedding website featuring event details, RSVP functionality, photo galleries, and guest information with elegant design and smooth user experience.",
          image: "/emily-matthew-wedding-screenshot.png",
          tags: ["Next.js", "Wedding", "RSVP", "Photography"],
          link: "https://www.emandmatthew.com/",
          category: "web",
        },
      ]

      setProjects(projectsData)
      setFilteredProjects(projectsData)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter projects based on search query and category
  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesSearch
    })

    setFilteredProjects(filtered)
  }, [searchQuery, projects])

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter((project) => project.category === category)
      setFilteredProjects(filtered)
    }

    setSearchQuery("")
  }

  // Handle project click
  const handleProjectClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <motion.section className="py-16 px-4 md:px-8" initial="hidden" animate="visible" variants={containerVariants}>
          <div className="container mx-auto">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">My Projects</h1>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                A showcase of my recent work including data platforms, fitness applications, and custom websites.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              {/* Loading state */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[350px] rounded-lg bg-muted animate-pulse"></div>
                  ))}
                </div>
              )}

              {/* Projects grid */}
              {!isLoading && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => handleProjectClick(project.link)}
                      />
                    ))}
                  </div>

                  {/* Empty state */}
                  {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No projects found</h3>
                      <p className="text-muted-foreground mt-2">Try a different search term</p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
