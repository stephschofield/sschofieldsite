"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ProjectCard } from "@/components/ProjectCard"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const { toast } = useToast()

  // Simulate fetching projects
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const projectsData = [
        {
          id: "1",
          title: "Productivity App",
          description:
            "A modern productivity application with task management, calendar integration, and note-taking features.",
          image: "/productivity-app-interface.png",
          tags: ["React", "TypeScript", "UI/UX"],
          link: "/projects/productivity-app",
          category: "web",
        },
        {
          id: "2",
          title: "Meditation App",
          description: "A calming meditation app with guided sessions, progress tracking, and ambient soundscapes.",
          image: "/meditation-app-interface.png",
          tags: ["React Native", "Mobile", "Health"],
          link: "/projects/meditation-app",
          category: "mobile",
        },
        {
          id: "3",
          title: "Color Palette Tool",
          description: "A designer's tool for creating and exploring harmonious color palettes for digital projects.",
          image: "/color-palette-tool.png",
          tags: ["JavaScript", "Design", "Tools"],
          link: "/projects/color-palette",
          category: "design",
        },
        {
          id: "4",
          title: "Typography System",
          description: "A comprehensive typography system for creating consistent and accessible text hierarchies.",
          image: "/typography-tool-interface.png",
          tags: ["Design", "CSS", "Accessibility"],
          link: "/projects/typography-system",
          category: "design",
        },
        {
          id: "5",
          title: "E-commerce Dashboard",
          description:
            "An analytics dashboard for online stores with sales metrics, inventory management, and customer insights.",
          image: "/analytics-dashboard.png",
          tags: ["React", "Data", "Dashboard"],
          link: "/projects/ecommerce-dashboard",
          category: "web",
        },
        {
          id: "6",
          title: "Fashion Boutique Website",
          description: "A stylish e-commerce website for a fashion boutique with product catalog and shopping cart.",
          image: "/fashion-boutique-website.png",
          tags: ["E-commerce", "UI/UX", "Next.js"],
          link: "/projects/fashion-boutique",
          category: "web",
        },
      ]

      setProjects(projectsData)
      setFilteredProjects(projectsData)
      setIsLoading(false)

      // Show welcome toast
      toast({
        title: "Projects loaded",
        description: "Browse through my latest projects and case studies.",
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

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
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Projects</h1>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Detailed case studies and in-depth looks at my professional work and personal projects.
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

            <motion.div variants={itemVariants} className="mb-8">
              <Tabs defaultValue="all" className="w-full" onValueChange={handleCategoryChange}>
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="web">Web</TabsTrigger>
                  <TabsTrigger value="mobile">Mobile</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            <motion.div variants={itemVariants}>
              {/* Loading state */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-[350px] rounded-lg bg-muted animate-pulse"></div>
                  ))}
                </div>
              )}

              {/* Projects grid */}
              {!isLoading && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => {
                          toast({
                            title: `Opening ${project.title}`,
                            description: "Navigating to project details...",
                          })
                        }}
                      />
                    ))}
                  </div>

                  {/* Empty state */}
                  {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No projects found</h3>
                      <p className="text-muted-foreground mt-2">Try a different search term or category</p>
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
