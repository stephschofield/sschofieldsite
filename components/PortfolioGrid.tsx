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
    title: "Contoso Data Products",
    description:
      "A comprehensive data products platform showcasing enterprise-level data solutions, analytics dashboards, and business intelligence tools with modern UI/UX design.",
    image: "/contoso-data-products.png",
    tags: ["React", "Data Analytics", "Enterprise", "UI/UX"],
    link: "https://contoso-data-products.com/",
  },
  {
    id: "2",
    title: "FitMix - Spotify Fitness App",
    description:
      "An innovative fitness application that integrates with Spotify to create personalized workout playlists, track fitness goals, and provide an engaging exercise experience.",
    image: "/fitmix-app.png",
    tags: ["React", "Spotify API", "Fitness", "Music Integration"],
    link: "https://v0-spotify-fitness-app.vercel.app/",
  },
  {
    id: "3",
    title: "Emily & Matthew's Wedding Site",
    description:
      "A beautiful, personalized wedding website featuring event details, RSVP functionality, photo galleries, and guest information with elegant design and smooth user experience.",
    image: "/emily-matthew-wedding.png",
    tags: ["Next.js", "Wedding", "RSVP", "Photography"],
    link: "https://www.emandmatthew.com/",
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
        // Open external links in new tab
        window.open(link, "_blank", "noopener,noreferrer")
      }
    } catch (error) {
      console.error("Error opening project:", error)
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
          {[1, 2, 3].map((i) => (
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
