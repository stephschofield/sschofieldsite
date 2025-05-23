"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

interface ProjectCardProps {
  project?: Project
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Return early if project is undefined
  if (!project) {
    return (
      <Card className="overflow-hidden h-full border-2">
        <div className="relative h-48 bg-muted animate-pulse"></div>
        <CardContent className="p-4">
          <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
          <div className="h-4 bg-muted animate-pulse rounded"></div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="h-6 bg-muted animate-pulse rounded w-16"></div>
        </CardFooter>
      </Card>
    )
  }

  const handleClick = () => {
    try {
      if (onClick) {
        onClick()
      }
    } catch (error) {
      console.error("Error in ProjectCard onClick:", error)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden h-full border-2 transition-all duration-300 hover:border-primary">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title || "Project image"}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            onError={(e) => {
              console.error("Error loading image:", project.image)
              e.currentTarget.src = "/placeholder.svg"
            }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-2">{project.title || "Untitled Project"}</h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {project.description || "No description available"}
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 p-4 pt-0">
          {project.tags && Array.isArray(project.tags) ? (
            project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary">No tags</Badge>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

// Also export as default for compatibility
export default ProjectCard
