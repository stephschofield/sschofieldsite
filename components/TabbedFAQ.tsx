"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, FileQuestion, Briefcase, Code, Palette, DollarSign } from "lucide-react"

export default function TabbedFAQ() {
  const categories = [
    { id: "general", label: "General", icon: <HelpCircle className="h-4 w-4" /> },
    { id: "services", label: "Services", icon: <Briefcase className="h-4 w-4" /> },
    { id: "process", label: "Process", icon: <FileQuestion className="h-4 w-4" /> },
    { id: "technical", label: "Technical", icon: <Code className="h-4 w-4" /> },
    { id: "design", label: "Design", icon: <Palette className="h-4 w-4" /> },
    { id: "pricing", label: "Pricing", icon: <DollarSign className="h-4 w-4" /> },
  ]

  const faqs = {
    general: [
      {
        question: "What services do you offer?",
        answer:
          "I specialize in UI/UX design, web development, mobile app development, and custom development solutions. My services include user research, wireframing, prototyping, visual design, frontend and backend development, and more.",
      },
      {
        question: "How long have you been in the industry?",
        answer:
          "I have over 8 years of experience in design and development, working with clients ranging from startups to enterprise companies across various industries.",
      },
      {
        question: "Do you work with clients internationally?",
        answer:
          "Yes, I work with clients globally. With modern collaboration tools and regular communication, location is not a barrier to successful projects.",
      },
      {
        question: "What makes your approach different?",
        answer:
          "I combine design thinking with technical expertise to create solutions that are not only beautiful but also functional and scalable. My approach is collaborative, transparent, and focused on achieving business goals while delivering exceptional user experiences.",
      },
    ],
    services: [
      {
        question: "Can you handle both design and development?",
        answer:
          "Yes, I offer end-to-end services from design to development. This integrated approach ensures consistency throughout the project and eliminates the common handoff issues between designers and developers.",
      },
      {
        question: "Do you offer maintenance services after project completion?",
        answer:
          "Yes, I offer ongoing maintenance and support packages to ensure your product continues to function optimally and stays up-to-date with the latest technologies and security standards.",
      },
      {
        question: "Can you work with our existing team?",
        answer:
          "Absolutely. I can collaborate with your in-house team, providing specialized expertise where needed. I'm comfortable working within established workflows and adapting to your team's processes.",
      },
      {
        question: "Do you provide consulting services?",
        answer:
          "Yes, I offer consulting services for businesses looking to improve their digital products, optimize workflows, or implement new technologies. These can be arranged as one-time sessions or ongoing advisory relationships.",
      },
    ],
    process: [
      {
        question: "What is your design process?",
        answer:
          "My design process begins with understanding the problem through research and stakeholder interviews. Then I move to ideation, wireframing, and prototyping. After iterative feedback and refinement, I finalize the designs and work closely with developers for implementation.",
      },
      {
        question: "How do you handle project management?",
        answer:
          "I use agile methodologies with regular check-ins and progress updates. Depending on the project, I utilize tools like Jira, Trello, or Notion to track progress, manage tasks, and maintain transparency throughout the development process.",
      },
      {
        question: "How do you communicate during projects?",
        answer:
          "Communication is key to successful projects. I provide regular updates via your preferred channels (email, Slack, etc.) and schedule weekly video calls to discuss progress, address questions, and gather feedback.",
      },
      {
        question: "What if I need changes after the project is complete?",
        answer:
          "I offer a revision period after project completion for minor adjustments. For more substantial changes, we can discuss a maintenance agreement or additional development phases to continue evolving your product.",
      },
    ],
    technical: [
      {
        question: "What technologies do you work with?",
        answer:
          "For frontend development, I primarily work with React, Next.js, TypeScript, and Tailwind CSS. For backend, I use Node.js, Express, MongoDB, and PostgreSQL. For mobile development, I specialize in React Native for cross-platform solutions.",
      },
      {
        question: "Can you work with our existing codebase?",
        answer:
          "Yes, I can work with existing codebases. I'll start with a code review to understand the architecture and identify areas for improvement while respecting the established patterns and practices.",
      },
      {
        question: "How do you ensure code quality?",
        answer:
          "I maintain high code quality through consistent coding standards, comprehensive testing (unit, integration, and end-to-end), code reviews, and continuous integration practices. I also use static code analysis tools to catch issues early.",
      },
      {
        question: "Do you handle deployment and hosting?",
        answer:
          "Yes, I can handle deployment to various platforms including Vercel, Netlify, AWS, and more. I can also provide guidance on hosting solutions that best fit your project's requirements and budget.",
      },
    ],
    design: [
      {
        question: "What is your design philosophy?",
        answer:
          "My design philosophy centers on creating intuitive, accessible, and visually appealing interfaces that solve real user problems. I believe in design that serves both users and business goals, with a focus on simplicity and clarity.",
      },
      {
        question: "Do you create design systems?",
        answer:
          "Yes, I specialize in creating comprehensive design systems that ensure consistency across products and streamline the development process. These systems include component libraries, style guides, design tokens, and documentation to facilitate collaboration between designers and developers.",
      },
      {
        question: "How do you approach responsive design?",
        answer:
          "I design with a mobile-first approach, ensuring that interfaces work seamlessly across all device sizes. I use flexible layouts, appropriate breakpoints, and testing on various devices to create truly responsive experiences that adapt to different screen sizes and orientations.",
      },
      {
        question: "Do you conduct user testing?",
        answer:
          "Yes, user testing is an integral part of my design process. I conduct usability testing at various stages to validate design decisions and identify areas for improvement. This can include moderated sessions, unmoderated remote testing, or guerrilla testing depending on project needs and constraints.",
      },
    ],
    pricing: [
      {
        question: "How do you structure your pricing?",
        answer:
          "I offer both project-based and hourly pricing models. For well-defined projects, I provide fixed-price quotes based on the scope and requirements. For ongoing work or projects with evolving requirements, an hourly rate may be more appropriate.",
      },
      {
        question: "What is your typical project budget range?",
        answer:
          "Project costs vary widely depending on complexity, scope, and timeline. Small projects typically start at $5,000, while more comprehensive solutions can range from $15,000 to $50,000+. I'm happy to provide a detailed quote based on your specific requirements.",
      },
      {
        question: "Do you require a deposit?",
        answer:
          "Yes, I typically require a 50% deposit to begin work, with the remaining balance due upon project completion. For larger projects, we can establish a milestone-based payment schedule to distribute costs throughout the development process.",
      },
      {
        question: "Do you offer discounts for startups or non-profits?",
        answer:
          "I offer special rates for early-stage startups and non-profit organizations. Please mention your organization's status when reaching out, and I'll be happy to discuss options that fit your budget while delivering the quality you need.",
      },
    ],
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about my services, process, and approach.
          </p>
        </motion.div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.icon}
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.icon}
                      {category.label} Questions
                    </CardTitle>
                    <CardDescription>
                      Frequently asked questions about {category.label.toLowerCase()} topics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs[category.id as keyof typeof faqs].map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Don't see your question here? Feel free to reach out directly.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold transition-all duration-300 ease-in-out hover:bg-primary/90"
            >
              Ask a Question
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
