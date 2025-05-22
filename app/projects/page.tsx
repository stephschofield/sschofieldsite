"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Home, Plus } from "lucide-react"
import { ProjectFilter } from "@/components/ProjectFilter"
import { Skeleton } from "@/components/ui/skeleton"

type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  date: string
  category: string
}

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const projects: Project[] = [
    {
      id: "flowspace",
      title: "Flowspace",
      description: "A productivity tool that helps teams organize their workflow with a visual, intuitive interface.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      image: "/productivity-app-interface.png",
      date: "2023-09-15",
      category: "Web App",
    },
    {
      id: "mindfull",
      title: "Mindfull",
      description: "A meditation app designed to help busy professionals find moments of calm throughout their day.",
      tags: ["React Native", "Firebase", "Redux"],
      image: "/meditation-app-interface.png",
      date: "2023-07-22",
      category: "Mobile App",
    },
    {
      id: "palette",
      title: "Palette",
      description:
        "A color management system for designers that simplifies the process of creating cohesive color schemes.",
      tags: ["Next.js", "TypeScript", "Framer Motion"],
      image: "/color-palette-tool.png",
      date: "2023-11-08",
      category: "Design Tool",
    },
    {
      id: "typeform",
      title: "Typeform",
      description:
        "A typography exploration tool that helps designers find the perfect font combinations for their projects.",
      tags: ["Vue.js", "Node.js", "MongoDB"],
      image: "/typography-tool-interface.png",
      date: "2024-01-20",
      category: "Design Tool",
    },
    {
      id: "ecommerce",
      title: "Fashion Boutique",
      description: "An e-commerce platform for a high-end fashion boutique with integrated payment processing.",
      tags: ["Shopify", "Liquid", "JavaScript"],
      image: "/fashion-boutique-website.png",
      date: "2023-05-10",
      category: "E-commerce",
    },
    {
      id: "dashboard",
      title: "Analytics Dashboard",
      description: "A comprehensive analytics dashboard for tracking business metrics and performance indicators.",
      tags: ["React", "D3.js", "Firebase"],
      image: "/analytics-dashboard.png",
      date: "2023-12-05",
      category: "Web App",
    },
  ]

  const categories = Array.from(new Set(projects.map((project) => project.category)))

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let result = [...projects]

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((project) => project.category.toLowerCase() === categoryFilter)
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "a-z":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "z-a":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }

    setFilteredProjects(result)
  }, [categoryFilter, sortBy])

  const handleFilterChange = (category: string, sort: string) => {
    setCategoryFilter(category)
    setSortBy(sort)
  }

  return (
    <div className="container mx-auto py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Projects</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h1>
        <Button asChild>
          <Link href="/editor">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <Separator className="my-6" />

      <ProjectFilter onFilterChange={handleFilterChange} categories={categories} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <Badge>{project.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link href={`/editor?project=${project.id}`}>Edit</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/projects/${project.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
