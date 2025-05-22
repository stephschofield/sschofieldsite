"use client"

import { motion } from "framer-motion"
import ProjectCard from "./ProjectCard"
import SocialLinks from "./SocialLinks"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-16">
          {/* Bio Section */}
          <div className="space-y-8">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Stephanie Schofield
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I'm a product designer and developer with over 8 years of experience creating digital products that solve
              real problems. My approach combines minimalist design principles with cutting-edge technology to create
              intuitive, beautiful experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* Projects Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900">My Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                title="Flowspace"
                description="A productivity tool that helps teams organize their workflow with a visual, intuitive interface."
                image="/productivity-app-interface.png"
                link="https://flowspace.example.com"
              />
              <ProjectCard
                title="Mindfull"
                description="A meditation app designed to help busy professionals find moments of calm throughout their day."
                image="/meditation-app-interface.png"
                link="https://mindfull.example.com"
                size="wide"
              />
              <ProjectCard
                title="Palette"
                description="A color management system for designers that simplifies the process of creating cohesive color schemes."
                image="/color-palette-tool.png"
                link="https://palette.example.com"
              />
              <ProjectCard
                title="Typeform"
                description="A typography exploration tool that helps designers find the perfect font combinations for their projects."
                image="/typography-tool-interface.png"
                link="https://typeform.example.com"
                size="wide"
              />
            </div>
          </motion.div>

          {/* FAQ Section with Accordion */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What services do you offer?</AccordionTrigger>
                <AccordionContent>
                  I specialize in UI/UX design, web development, and digital product strategy. My services include user
                  research, wireframing, prototyping, visual design, and front-end development.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is your design process?</AccordionTrigger>
                <AccordionContent>
                  My design process begins with understanding the problem through research and stakeholder interviews.
                  Then I move to ideation, wireframing, and prototyping. After iterative feedback and refinement, I
                  finalize the designs and work closely with developers for implementation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do you approach new projects?</AccordionTrigger>
                <AccordionContent>
                  I approach each project with a focus on the end user's needs and business goals. I believe in
                  collaborative design processes and maintaining open communication throughout the project lifecycle.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
