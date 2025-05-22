"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectDetailSkeleton } from "@/components/ProjectDetailSkeleton"
import { ProjectNotes } from "@/components/ProjectNotes"
import { Home, ExternalLink, CalendarIcon, FileText, Users, Settings } from "lucide-react"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // This would normally come from an API or database
  const projects = {
    flowspace: {
      title: "Flowspace",
      description: "A productivity tool that helps teams organize their workflow with a visual, intuitive interface.",
      longDescription:
        "Flowspace is a comprehensive productivity platform designed to help teams visualize and manage their workflows efficiently. It features drag-and-drop task management, real-time collaboration tools, and customizable workflows that adapt to your team's unique processes.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      image: "/productivity-app-interface.png",
      gallery: ["/productivity-app-interface.png", "/productivity-app-dashboard.png", "/productivity-app-mobile.png"],
      features: [
        "Drag-and-drop task management",
        "Real-time collaboration",
        "Customizable workflows",
        "Time tracking",
        "Reporting and analytics",
      ],
      team: [
        { name: "Alex Morgan", role: "Lead Developer", avatar: "/diverse-group.png" },
        { name: "Jamie Smith", role: "UI/UX Designer", avatar: "/diverse-group.png" },
        { name: "Taylor Johnson", role: "Product Manager", avatar: "/diverse-group.png" },
      ],
      launchDate: new Date("2023-06-15"),
      website: "https://flowspace.example.com",
      notes:
        "Need to update the dashboard UI and add new analytics features. Team meeting scheduled for next week to discuss roadmap.",
    },
    mindfull: {
      title: "Mindfull",
      description: "A meditation app designed to help busy professionals find moments of calm throughout their day.",
      longDescription:
        "Mindfull is a meditation and mindfulness app specifically designed for busy professionals. It offers short, effective meditation sessions that can be easily integrated into a hectic schedule, along with breathing exercises, sleep stories, and focus-enhancing soundscapes.",
      tags: ["React Native", "Firebase", "Redux"],
      image: "/meditation-app-interface.png",
      gallery: ["/meditation-app-interface.png", "/meditation-app-dashboard.png", "/meditation-app-session.png"],
      features: [
        "Guided meditation sessions",
        "Breathing exercises",
        "Sleep stories",
        "Focus-enhancing soundscapes",
        "Progress tracking",
      ],
      team: [
        { name: "Jordan Lee", role: "Mobile Developer", avatar: "/diverse-group.png" },
        { name: "Casey Wong", role: "Sound Designer", avatar: "/diverse-group.png" },
        { name: "Riley Chen", role: "Content Creator", avatar: "/diverse-group.png" },
      ],
      launchDate: new Date("2023-09-22"),
      website: "https://mindfull.example.com",
      notes:
        "Working on new sleep stories and guided meditations. Need to improve the onboarding flow based on user feedback.",
    },
    palette: {
      title: "Palette",
      description:
        "A color management system for designers that simplifies the process of creating cohesive color schemes.",
      longDescription:
        "Palette is a sophisticated color management tool that helps designers create harmonious color schemes for their projects. It features color extraction from images, accessibility checking, and export options for various design tools and platforms.",
      tags: ["Next.js", "TypeScript", "Framer Motion"],
      image: "/color-palette-tool.png",
      gallery: [
        "/color-palette-tool.png",
        "/placeholder.svg?height=600&width=800&query=color palette generator",
        "/placeholder.svg?height=600&width=800&query=color accessibility checker",
      ],
      features: [
        "Color extraction from images",
        "Accessibility checking",
        "Export to design tools",
        "Color harmony suggestions",
        "Color blindness simulation",
      ],
      team: [
        {
          name: "Morgan Taylor",
          role: "Frontend Developer",
          avatar: "/diverse-group.png",
        },
        { name: "Sam Rodriguez", role: "Color Scientist", avatar: "/diverse-group.png" },
        { name: "Jesse Kim", role: "UX Researcher", avatar: "/diverse-group.png" },
      ],
      launchDate: new Date("2023-11-08"),
      website: "https://palette.example.com",
      notes: "Planning to add integration with Adobe Creative Cloud. User testing scheduled for next month.",
    },
    typeform: {
      title: "Typeform",
      description:
        "A typography exploration tool that helps designers find the perfect font combinations for their projects.",
      longDescription:
        "Typeform is an innovative typography tool that helps designers discover and test font combinations for their projects. It includes a vast library of web fonts, pairing suggestions based on design principles, and real-time previewing in various contexts.",
      tags: ["Vue.js", "Node.js", "MongoDB"],
      image: "/typography-tool-interface.png",
      gallery: [
        "/typography-tool-interface.png",
        "/placeholder.svg?height=600&width=800&query=font pairing tool",
        "/placeholder.svg?height=600&width=800&query=typography preview tool",
      ],
      features: [
        "Font pairing suggestions",
        "Real-time previewing",
        "Typography scale calculator",
        "Readability analysis",
        "Export to CSS/HTML",
      ],
      team: [
        {
          name: "Avery Johnson",
          role: "Full Stack Developer",
          avatar: "/diverse-group.png",
        },
        {
          name: "Quinn Martinez",
          role: "Typography Expert",
          avatar: "/diverse-group.png",
        },
        {
          name: "Reese Thompson",
          role: "Frontend Developer",
          avatar: "/diverse-group.png",
        },
      ],
      launchDate: new Date("2024-01-20"),
      website: "https://typeform.example.com",
      notes:
        "Need to expand the font library and improve performance. Considering adding a premium tier with advanced features.",
    },
  }

  const project = projects[id as keyof typeof projects]

  if (!project) {
    return <div className="container mx-auto py-12">Project not found</div>
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
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {isLoading ? (
        <ProjectDetailSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-lg mb-8">{project.longDescription}</p>

              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="gallery" className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M4 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" />
                      <path d="M10 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5Z" />
                      <path d="M4 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2Z" />
                      <path d="M10 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" />
                      <path d="M16 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5Z" />
                      <path d="M16 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" />
                      <path d="M4 17a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2Z" />
                      <path d="M10 17a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" />
                      <path d="M16 17a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" />
                    </svg>
                    Gallery
                  </TabsTrigger>
                  <TabsTrigger value="team" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M3 5h18" />
                      <path d="M3 12h18" />
                      <path d="M3 19h18" />
                    </svg>
                    Notes
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                  <ul className="space-y-2 mb-8">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Checkbox id={`feature-${index}`} className="mt-1 mr-2" />
                        <label htmlFor={`feature-${index}`} className="text-base">
                          {feature}
                        </label>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="mb-8">
                    <a href={project.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </TabsContent>
                <TabsContent value="gallery" className="mt-6">
                  <Carousel className="mb-8">
                    <CarouselContent>
                      {project.gallery.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-video items-center justify-center p-0">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`${project.title} screenshot ${index + 1}`}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </TabsContent>
                <TabsContent value="team" className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">Team Members</h2>
                  <div className="space-y-4">
                    {project.team.map((member, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="mt-6">
                  <ProjectNotes projectId={id as string} initialNotes={project.notes} />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Launch Date
                  </h3>
                  <Calendar
                    mode="single"
                    selected={project.launchDate}
                    onSelect={setDate}
                    disabled={(date) => date > new Date() || date < new Date("2022-01-01")}
                    className="rounded-md border mb-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    This project was launched on {project.launchDate.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Project Actions
                  </h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`/editor?project=${id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                        Edit Project
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </svg>
                      Export Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                      </svg>
                      Duplicate Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}
