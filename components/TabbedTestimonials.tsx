"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Quote } from "lucide-react"

export default function TabbedTestimonials() {
  const categories = [
    { id: "all", label: "All" },
    { id: "design", label: "Design" },
    { id: "development", label: "Development" },
    { id: "mobile", label: "Mobile" },
    { id: "enterprise", label: "Enterprise" },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "/diverse-group.png",
      quote:
        "Working with Stephanie was a game-changer for our product. Her design expertise and attention to detail transformed our user experience completely. Our user engagement metrics have improved by 45% since launch.",
      categories: ["design", "all"],
    },
    {
      id: 2,
      name: "Jamie Smith",
      role: "CTO",
      company: "StartupX",
      avatar: "/diverse-group.png",
      quote:
        "Stephanie delivered our web application ahead of schedule and with exceptional quality. Her technical skills and problem-solving abilities made complex challenges seem easy. I wouldn't hesitate to work with her again.",
      categories: ["development", "all"],
    },
    {
      id: 3,
      name: "Morgan Taylor",
      role: "Marketing Director",
      company: "BrandCo",
      avatar: "/diverse-group.png",
      quote:
        "The mobile app Stephanie designed for our campaign exceeded all expectations. It was intuitive, beautiful, and our customers loved it. The app had over 100,000 downloads in the first month alone.",
      categories: ["mobile", "design", "all"],
    },
    {
      id: 4,
      name: "Casey Wong",
      role: "CEO",
      company: "InnovateTech",
      avatar: "/diverse-group.png",
      quote:
        "We hired Stephanie for a complete redesign of our enterprise platform. The results were outstanding - not only did she improve the visual design, but she also streamlined workflows that saved our users hours each week.",
      categories: ["enterprise", "design", "all"],
    },
    {
      id: 5,
      name: "Jordan Lee",
      role: "Lead Developer",
      company: "DevShop",
      avatar: "/diverse-group.png",
      quote:
        "As a developer, I appreciate working with designers who understand technical constraints. Stephanie not only created beautiful designs but also ensured they were feasible to implement efficiently. Her code contributions were clean and well-documented.",
      categories: ["development", "all"],
    },
    {
      id: 6,
      name: "Taylor Rodriguez",
      role: "Product Owner",
      company: "FinTech Solutions",
      avatar: "/diverse-group.png",
      quote:
        "Our enterprise application had complex requirements and strict security needs. Stephanie navigated these challenges expertly, delivering a system that was both secure and user-friendly - a rare combination in our industry.",
      categories: ["enterprise", "development", "all"],
    },
    {
      id: 7,
      name: "Riley Chen",
      role: "App Store Manager",
      company: "MobileFirst",
      avatar: "/diverse-group.png",
      quote:
        "The mobile application Stephanie developed for us became a featured app on both iOS and Android stores. Her attention to platform-specific design guidelines while maintaining a consistent brand experience was impressive.",
      categories: ["mobile", "all"],
    },
    {
      id: 8,
      name: "Avery Williams",
      role: "UX Director",
      company: "DesignStudio",
      avatar: "/diverse-group.png",
      quote:
        "I've worked with many designers, but Stephanie stands out for her ability to balance creativity with business objectives. Her design solutions are not just beautiful but strategically sound and focused on delivering results.",
      categories: ["design", "all"],
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Client Testimonials</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients have to say about working with me on various projects.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {testimonials
                  .filter((testimonial) => testimonial.categories.includes(category.id))
                  .map((testimonial) => (
                    <Card key={testimonial.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/10">
                            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </div>

                        <div className="relative">
                          <Quote className="absolute top-0 left-0 h-6 w-6 text-primary/20 -translate-x-2 -translate-y-2" />
                          <p className="text-muted-foreground relative z-10 pl-4">{testimonial.quote}</p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {testimonial.categories
                            .filter((cat) => cat !== "all")
                            .map((category) => (
                              <Badge key={category} variant="outline">
                                {categories.find((cat) => cat.id === category)?.label}
                              </Badge>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
