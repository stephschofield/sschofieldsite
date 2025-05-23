"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProjectCard } from "@/components/ProjectCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Productivity App",
    description: "A productivity app designed to help users manage their tasks and time effectively.",
    image: "/productivity-app-interface.png",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "/projects/productivity-app",
  },
  {
    id: "2",
    title: "Meditation App",
    description: "A meditation app with guided sessions and progress tracking.",
    image: "/meditation-app-interface.png",
    tags: ["React Native", "Redux", "Node.js"],
    link: "/projects/meditation-app",
  },
  {
    id: "3",
    title: "Color Palette Tool",
    description: "A tool for designers to create and export color palettes for their projects.",
    image: "/color-palette-tool.png",
    tags: ["JavaScript", "Canvas API", "CSS"],
    link: "/projects/color-palette",
  },
  {
    id: "4",
    title: "Typography Tool",
    description: "A web application for testing and comparing different typography combinations.",
    image: "/typography-tool-interface.png",
    tags: ["Vue.js", "SCSS", "Firebase"],
    link: "/projects/typography-tool",
  },
  {
    id: "5",
    title: "Fashion Boutique Website",
    description: "An e-commerce website for a fashion boutique with a focus on user experience.",
    image: "/fashion-boutique-website.png",
    tags: ["Next.js", "Stripe", "MongoDB"],
    link: "/projects/fashion-boutique",
  },
  {
    id: "6",
    title: "Analytics Dashboard",
    description: "A comprehensive analytics dashboard for tracking business metrics.",
    image: "/analytics-dashboard.png",
    tags: ["React", "D3.js", "GraphQL"],
    link: "/projects/analytics-dashboard",
  },
]

export default function PortfolioGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [loadedProjects, setLoadedProjects] = useState<Project[]>([])
  const router = useRouter()

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoadedProjects(projects)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredProjects = loadedProjects.filter((project) => {
    if (!project) return false
    const searchString = `${project.title || ""} ${project.description || ""} ${
      project.tags ? project.tags.join(" ") : ""
    }`.toLowerCase()
    return searchString.includes(searchQuery.toLowerCase())
  })

  const handleProjectClick = (link: string) => {
    try {
      if (link) {
        router.push(link)
      }
    } catch (error) {
      console.error("Error navigating to project:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold">My Projects</h2>
          <div className="relative w-full md:w-64">
            <div className="h-10 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">My Projects</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredProjects.length === 0 && !isLoading ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-4">No projects found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
          <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project?.id || Math.random()}
              project={project}
              onClick={() => handleProjectClick(project?.link || "")}
            />
          ))}
        </div>
      )}
    </div>
  )
}
