"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Code,
  Database,
  Palette,
  Settings,
  LineChart,
  Layers,
  Lightbulb,
  Workflow,
  Laptop,
  Server,
  Smartphone,
  Figma,
} from "lucide-react"

export default function SkillsSection() {
  const skillCategories = [
    {
      id: "development",
      title: "Development",
      icon: <Code className="h-5 w-5" />,
      skills: [
        { name: "JavaScript", level: 92, icon: <Code className="h-4 w-4" /> },
        { name: "TypeScript", level: 88, icon: <Code className="h-4 w-4" /> },
        { name: "React", level: 95, icon: <Code className="h-4 w-4" /> },
        { name: "Next.js", level: 90, icon: <Code className="h-4 w-4" /> },
        { name: "Node.js", level: 85, icon: <Server className="h-4 w-4" /> },
        { name: "Python", level: 80, icon: <Code className="h-4 w-4" /> },
        { name: "C/C++", level: 75, icon: <Code className="h-4 w-4" /> },
        { name: "HTML/CSS", level: 98, icon: <Code className="h-4 w-4" /> },
        { name: "Tailwind CSS", level: 96, icon: <Palette className="h-4 w-4" /> },
        { name: "SQL", level: 88, icon: <Database className="h-4 w-4" /> },
      ],
      tools: ["VS Code", "Git", "npm", "Webpack", "Vite", "Storybook", "Jest"],
    },
    {
      id: "design",
      title: "Design",
      icon: <Palette className="h-5 w-5" />,
      skills: [
        { name: "UI/UX Design", level: 95, icon: <Palette className="h-4 w-4" /> },
        { name: "Figma", level: 90, icon: <Figma className="h-4 w-4" /> },
        { name: "Prototyping", level: 92, icon: <Workflow className="h-4 w-4" /> },
        { name: "User Research", level: 85, icon: <Lightbulb className="h-4 w-4" /> },
        { name: "Wireframing", level: 90, icon: <Layers className="h-4 w-4" /> },
        { name: "Design Systems", level: 88, icon: <Palette className="h-4 w-4" /> },
        { name: "Responsive Design", level: 94, icon: <Palette className="h-4 w-4" /> },
      ],
      tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Photoshop", "Illustrator"],
    },
    {
      id: "tools",
      title: "Tools & Platforms",
      icon: <Settings className="h-5 w-5" />,
      skills: [
        { name: "Azure", level: 85, icon: <Settings className="h-4 w-4" /> },
        { name: "Fabric", level: 80, icon: <Settings className="h-4 w-4" /> },
        { name: "GitHub Copilot", level: 90, icon: <Settings className="h-4 w-4" /> },
        { name: "Vercel", level: 92, icon: <Settings className="h-4 w-4" /> },
        { name: "Figma", level: 95, icon: <Figma className="h-4 w-4" /> },
        { name: "Mural", level: 88, icon: <Settings className="h-4 w-4" /> },
        { name: "Cursor", level: 85, icon: <Settings className="h-4 w-4" /> },
        { name: "ADO", level: 90, icon: <Settings className="h-4 w-4" /> },
        { name: "Git", level: 92, icon: <Settings className="h-4 w-4" /> },
        { name: "Docker", level: 88, icon: <Settings className="h-4 w-4" /> },
      ],
      tools: [],
    },
    {
      id: "data",
      title: "Data & Analytics",
      icon: <Database className="h-5 w-5" />,
      skills: [
        { name: "Power BI", level: 90, icon: <Database className="h-4 w-4" /> },
        { name: "Data Visualization", level: 85, icon: <Database className="h-4 w-4" /> },
        { name: "SQL Server", level: 88, icon: <Database className="h-4 w-4" /> },
        { name: "PostgreSQL", level: 75, icon: <Database className="h-4 w-4" /> },
        { name: "MongoDB", level: 78, icon: <Database className="h-4 w-4" /> },
        { name: "Data Analysis", level: 92, icon: <Database className="h-4 w-4" /> },
        { name: "ETL Processes", level: 85, icon: <Database className="h-4 w-4" /> },
      ],
      tools: [],
    },
    {
      id: "frontend",
      title: "Frontend",
      icon: <Laptop className="h-5 w-5" />,
      skills: [
        { name: "HTML/CSS", level: 98, icon: <Code className="h-4 w-4" /> },
        { name: "JavaScript", level: 92, icon: <Code className="h-4 w-4" /> },
        { name: "TypeScript", level: 88, icon: <Code className="h-4 w-4" /> },
        { name: "React", level: 95, icon: <Code className="h-4 w-4" /> },
        { name: "Next.js", level: 90, icon: <Code className="h-4 w-4" /> },
        { name: "Tailwind CSS", level: 96, icon: <Palette className="h-4 w-4" /> },
      ],
      tools: ["VS Code", "Git", "npm", "Webpack", "Vite", "Storybook", "Jest"],
    },
    {
      id: "backend",
      title: "Backend",
      icon: <Server className="h-5 w-5" />,
      skills: [
        { name: "Node.js", level: 85, icon: <Server className="h-4 w-4" /> },
        { name: "Express", level: 82, icon: <Server className="h-4 w-4" /> },
        { name: "MongoDB", level: 78, icon: <Database className="h-4 w-4" /> },
        { name: "PostgreSQL", level: 75, icon: <Database className="h-4 w-4" /> },
        { name: "GraphQL", level: 80, icon: <Database className="h-4 w-4" /> },
        { name: "REST APIs", level: 90, icon: <Server className="h-4 w-4" /> },
      ],
      tools: ["Postman", "MongoDB Compass", "pgAdmin", "Docker", "Firebase"],
    },
    {
      id: "mobile",
      title: "Mobile",
      icon: <Smartphone className="h-5 w-5" />,
      skills: [
        { name: "React Native", level: 88, icon: <Smartphone className="h-4 w-4" /> },
        { name: "Flutter", level: 70, icon: <Smartphone className="h-4 w-4" /> },
        { name: "iOS (Swift)", level: 65, icon: <Smartphone className="h-4 w-4" /> },
        { name: "Android (Kotlin)", level: 60, icon: <Smartphone className="h-4 w-4" /> },
        { name: "Mobile UI/UX", level: 92, icon: <Palette className="h-4 w-4" /> },
        { name: "App Performance", level: 85, icon: <Database className="h-4 w-4" /> },
      ],
      tools: ["Xcode", "Android Studio", "Expo", "Firebase", "App Center", "TestFlight"],
    },
    {
      id: "other",
      title: "Other",
      icon: <LineChart className="h-5 w-5" />,
      skills: [
        { name: "Project Management", level: 85, icon: <Workflow className="h-4 w-4" /> },
        { name: "SEO", level: 80, icon: <LineChart className="h-4 w-4" /> },
        { name: "Analytics", level: 82, icon: <LineChart className="h-4 w-4" /> },
        { name: "Accessibility", level: 88, icon: <Lightbulb className="h-4 w-4" /> },
        { name: "Performance Optimization", level: 86, icon: <Database className="h-4 w-4" /> },
        { name: "Technical Writing", level: 83, icon: <Code className="h-4 w-4" /> },
      ],
      tools: ["Jira", "Lighthouse", "WAVE", "Notion"],
    },
  ]

  return (
    <section id="skills" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Skills & Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            With experience across the full product development lifecycle, I bring a diverse set of skills to every
            project.
          </p>
        </motion.div>

        <Tabs defaultValue="development" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-8">
            {skillCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.icon}
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.icon}
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                          {category.icon}
                          {category.title} Skills
                        </h3>
                        <div className="space-y-6">
                          {category.skills.map((skill, index) => (
                            <div key={index}>
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                  {skill.icon}
                                  <span className="font-medium">{skill.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-6">Tools & Technologies</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {category.tools.map((tool, index) => (
                            <div
                              key={index}
                              className="flex items-center p-3 border rounded-md bg-background hover:bg-muted/50 transition-colors"
                            >
                              <div className="bg-primary/10 p-2 rounded-full mr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 text-primary"
                                >
                                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                                </svg>
                              </div>
                              <span>{tool}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8">
                          <h3 className="text-xl font-semibold mb-4">Experience Highlights</h3>
                          <div className="space-y-3">
                            <div className="flex items-start gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-primary shrink-0 mt-0.5"
                              >
                                <polyline points="9 11 12 14 22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                              </svg>
                              <span className="text-sm">
                                {category.id === "development"
                                  ? "Built scalable web applications using modern frameworks"
                                  : category.id === "design"
                                    ? "Led design for 20+ successful digital products"
                                    : category.id === "tools"
                                      ? "Utilized various tools and platforms for efficient development"
                                      : category.id === "data"
                                        ? "Developed and analyzed data-driven solutions"
                                        : category.id === "frontend"
                                          ? "Built 15+ responsive web applications"
                                          : category.id === "backend"
                                            ? "Developed scalable APIs for enterprise clients"
                                            : category.id === "mobile"
                                              ? "Launched 8 mobile apps on iOS and Android"
                                              : "Managed cross-functional teams for product delivery"}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-primary shrink-0 mt-0.5"
                              >
                                <polyline points="9 11 12 14 22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                              </svg>
                              <span className="text-sm">
                                {category.id === "development"
                                  ? "Implemented complex UI with modern frameworks"
                                  : category.id === "design"
                                    ? "Created design systems for consistency and efficiency"
                                    : category.id === "tools"
                                      ? "Optimized development workflows for faster delivery"
                                      : category.id === "data"
                                        ? "Optimized database performance for high-traffic applications"
                                        : category.id === "frontend"
                                          ? "Focused on accessibility and performance optimization"
                                          : category.id === "backend"
                                            ? "Implemented secure authentication and authorization systems"
                                            : category.id === "mobile"
                                              ? "Designed for native mobile experiences across platforms"
                                              : "Improved conversion rates through data-driven optimization"}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-primary shrink-0 mt-0.5"
                              >
                                <polyline points="9 11 12 14 22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                              </svg>
                              <span className="text-sm">
                                {category.id === "development"
                                  ? "Utilized GitHub Copilot for code generation"
                                  : category.id === "design"
                                    ? "Conducted user research to inform design decisions"
                                    : category.id === "tools"
                                      ? "Streamlined development processes using Azure and Fabric"
                                      : category.id === "data"
                                        ? "Implemented ETL processes for efficient data management"
                                        : category.id === "frontend"
                                          ? "Optimized for offline functionality and low connectivity"
                                          : category.id === "backend"
                                            ? "Focused on scalability and reliability"
                                            : category.id === "mobile"
                                              ? "Enhanced user experience with performance optimization"
                                              : "Collaborated with cross-functional teams for successful project outcomes"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-8" />

                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-4">Related Projects</h3>
                      <div className="flex flex-wrap justify-center gap-4">
                        {category.id === "development" ? (
                          <>
                            <a
                              href="https://v0-spotify-fitness-app.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              FitMix - Spotify Fitness App
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                            <a
                              href="https://contoso-data-products.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              Contoso Data Products
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </>
                        ) : category.id === "design" ? (
                          <>
                            <a
                              href="https://www.emandmatthew.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              Emily & Matthew's Wedding Site
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                            <a
                              href="https://contoso-data-products.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              Contoso Data Products
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </>
                        ) : category.id === "tools" ? (
                          <>
                            <a
                              href="/portfolio"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              View All Projects
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </>
                        ) : category.id === "data" ? (
                          <>
                            <a
                              href="https://contoso-data-products.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              Contoso Data Products
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                            <a
                              href="https://v0-spotify-fitness-app.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              FitMix - Spotify Integration
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </>
                        ) : category.id === "frontend" ? (
                          <>
                            <a
                              href="https://v0-spotify-fitness-app.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              FitMix - Spotify Fitness App
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                            <a
                              href="https://contoso-data-products.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              Contoso Data Products
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </>
                        ) : category.id === "backend" ? (
                          <>
                            <a
                              href="https://contoso-data-products.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              Contoso Data Products
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                            <a
                              href="https://v0-spotify-fitness-app.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              FitMix - Spotify Integration
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </>
                        ) : category.id === "mobile" ? (
                          <>
                            <a
                              href="https://v0-spotify-fitness-app.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              FitMix - Mobile Experience
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                            <a
                              href="https://www.emandmatthew.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              Emily & Matthew's Wedding Site
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </>
                        ) : (
                          <>
                            <a
                              href="/portfolio"
                              className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                              View All Projects
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 h-4 w-4"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
