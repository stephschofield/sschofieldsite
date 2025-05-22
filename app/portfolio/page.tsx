"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Mail, MapPin, Calendar } from "lucide-react"
import Image from "next/image"

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("about")

  const projects = [
    {
      id: 1,
      title: "Productivity App",
      description: "A comprehensive task management application with real-time collaboration features.",
      image: "/productivity-app-interface.png",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 2,
      title: "Meditation App",
      description: "A mindfulness and meditation app with guided sessions and progress tracking.",
      image: "/meditation-app-interface.png",
      technologies: ["React Native", "Firebase", "Redux"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "A data visualization dashboard for business intelligence and reporting.",
      image: "/analytics-dashboard.png",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ]

  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "REST APIs",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Stephanie Schofield</h1>
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setActiveSection("about")}
                className={`text-sm font-medium ${
                  activeSection === "about" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveSection("skills")}
                className={`text-sm font-medium ${
                  activeSection === "skills" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveSection("projects")}
                className={`text-sm font-medium ${
                  activeSection === "projects" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveSection("contact")}
                className={`text-sm font-medium ${
                  activeSection === "contact" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* About Section */}
        {activeSection === "about" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-600">SS</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-4">About Me</h2>
                  <p className="text-gray-600 mb-4">
                    I'm a passionate full-stack developer with over 5 years of experience creating beautiful and
                    functional web applications. I specialize in React, TypeScript, and modern web technologies.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Available for projects
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Skills & Technologies</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === "contact" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to
                  work together!
                </p>
                <Button size="lg" asChild>
                  <a href="mailto:stephanie@example.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Send Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
