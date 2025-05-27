"use client"

import { motion } from "framer-motion"
import SkillsSection from "@/components/SkillsSection"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm a passionate UI/UX designer and full-stack developer based in Dallas, Texas, with a love for creating
              beautiful, functional digital experiences that make a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Background</h2>
                  <p className="text-muted-foreground mb-6">
                    With a strong foundation in both design and development, I bridge the gap between creative vision
                    and technical implementation. My approach combines user-centered design principles with modern
                    development practices to create seamless digital experiences.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Dallas, Texas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>5+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-4 w-4 text-primary" />
                      <span>UI/UX Design & Full-Stack Development</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
                  <p className="text-muted-foreground mb-6">
                    I specialize in creating end-to-end digital solutions, from initial concept and user research to
                    final implementation and deployment.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">UI/UX Design</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">User Research</Badge>
                        <Badge variant="secondary">Wireframing</Badge>
                        <Badge variant="secondary">Prototyping</Badge>
                        <Badge variant="secondary">Design Systems</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Development</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Next.js</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="secondary">Node.js</Badge>
                        <Badge variant="secondary">Python</Badge>
                        <Badge variant="secondary">C/C++</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Tools & Platforms</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Azure</Badge>
                        <Badge variant="secondary">Fabric</Badge>
                        <Badge variant="secondary">GitHub Copilot</Badge>
                        <Badge variant="secondary">Vercel</Badge>
                        <Badge variant="secondary">Figma</Badge>
                        <Badge variant="secondary">Mural</Badge>
                        <Badge variant="secondary">Cursor</Badge>
                        <Badge variant="secondary">ADO</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Philosophy */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">My Philosophy</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  "Great design is not just about how it looks, but how it works. I believe in creating digital
                  experiences that are not only visually appealing but also intuitive, accessible, and meaningful to the
                  people who use them."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Highlights */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Experience Highlights</h2>
            <p className="text-muted-foreground">Some of the projects and achievements I'm most proud of</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Web Applications</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8+</div>
                  <div className="text-sm text-muted-foreground">Mobile Apps</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
