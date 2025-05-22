"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Code,
  Paintbrush,
  Smartphone,
  Globe,
  Lightbulb,
  Layers,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      id: "ui-ux",
      title: "UI/UX Design",
      icon: <Paintbrush className="h-5 w-5" />,
      description:
        "Creating intuitive and beautiful user interfaces that enhance user experience and drive engagement.",
      features: [
        "User Research & Personas",
        "Wireframing & Prototyping",
        "Visual Design",
        "Usability Testing",
        "Design Systems",
        "Responsive Design",
      ],
      tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"],
      timeline: "2-4 weeks",
      pricing: "Starting at $2,500",
      caseStudies: [
        { name: "Flowspace Dashboard", link: "/projects/flowspace" },
        { name: "Mindfull Mobile App", link: "/projects/mindfull" },
      ],
    },
    {
      id: "web-dev",
      title: "Web Development",
      icon: <Globe className="h-5 w-5" />,
      description:
        "Building responsive, performant websites and web applications using modern technologies and best practices.",
      features: [
        "Frontend Development",
        "Backend Development",
        "CMS Integration",
        "E-commerce Solutions",
        "Performance Optimization",
        "SEO Implementation",
      ],
      tools: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
      timeline: "4-8 weeks",
      pricing: "Starting at $5,000",
      caseStudies: [
        { name: "Palette Color Tool", link: "/projects/palette" },
        { name: "Typeform Typography Tool", link: "/projects/typeform" },
      ],
    },
    {
      id: "mobile-dev",
      title: "Mobile Development",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Developing cross-platform mobile applications that work seamlessly on iOS and Android devices.",
      features: [
        "Native App Development",
        "Cross-platform Solutions",
        "UI/UX for Mobile",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
      ],
      tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      timeline: "6-12 weeks",
      pricing: "Starting at $8,000",
      caseStudies: [{ name: "Mindfull Meditation App", link: "/projects/mindfull" }],
    },
    {
      id: "custom-dev",
      title: "Custom Development",
      icon: <Code className="h-5 w-5" />,
      description: "Specialized development services for unique requirements and complex technical challenges.",
      features: [
        "API Development",
        "Third-party Integrations",
        "Database Design",
        "Authentication Systems",
        "Payment Processing",
        "Real-time Features",
      ],
      tools: ["GraphQL", "REST APIs", "MongoDB", "PostgreSQL", "AWS", "Stripe"],
      timeline: "Varies by project",
      pricing: "Custom quotes based on requirements",
      caseStudies: [{ name: "Flowspace Collaboration Tools", link: "/projects/flowspace" }],
    },
  ]

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Services</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            I offer a range of design and development services to help bring your digital products to life. Explore my
            services below to find the right fit for your project.
          </p>
        </motion.div>

        <Tabs defaultValue="ui-ux" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {services.map((service) => (
              <TabsTrigger key={service.id} value={service.id} className="flex items-center gap-2">
                {service.icon}
                <span className="hidden sm:inline">{service.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          {service.icon}
                          <CardTitle>{service.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h3 className="text-lg font-medium mb-4">What's Included</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Separator className="my-6" />

                        <h3 className="text-lg font-medium mb-4">Case Studies</h3>
                        <div className="space-y-4">
                          {service.caseStudies.map((study, index) => (
                            <Card key={index} className="overflow-hidden">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium">{study.name}</h4>
                                  <Button variant="ghost" size="sm" asChild>
                                    <a href={study.link}>
                                      View Case Study
                                      <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Service Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Tools & Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.tools.map((tool, index) => (
                              <Badge key={index} variant="secondary">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <h4 className="text-sm font-medium">Timeline</h4>
                              <p className="text-sm text-muted-foreground">{service.timeline}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <h4 className="text-sm font-medium">Pricing</h4>
                              <p className="text-sm text-muted-foreground">{service.pricing}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <a href="#contact">Request a Quote</a>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>My Approach</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Lightbulb className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Discovery</h4>
                              <p className="text-sm text-muted-foreground">
                                Understanding your goals, audience, and requirements
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Paintbrush className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Design</h4>
                              <p className="text-sm text-muted-foreground">
                                Creating solutions that address user needs and business goals
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Code className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Development</h4>
                              <p className="text-sm text-muted-foreground">
                                Building with clean, efficient code and best practices
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Layers className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Delivery</h4>
                              <p className="text-sm text-muted-foreground">
                                Testing, refinement, and handover with documentation
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
