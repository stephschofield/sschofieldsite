"use client"

import { motion } from "framer-motion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Home } from "lucide-react"
import { ToastDemo } from "@/components/ToastDemo"

export default function ToastDemoPage() {
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
            <BreadcrumbPage>Toast Demo</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Toast Notifications</h1>
          <p className="text-lg text-muted-foreground">
            Explore different types of toast notifications used throughout the application.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Toast Examples</CardTitle>
            <CardDescription>Click on the buttons below to see different types of toast notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <ToastDemo />
          </CardContent>
        </Card>

        <Separator className="my-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>About Toast Notifications</CardTitle>
              <CardDescription>Understanding the purpose of toast notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Toast notifications provide brief, non-intrusive messages to users about the outcome of their actions.
                They appear temporarily and disappear automatically, making them ideal for success messages, errors, and
                other important updates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
              <CardDescription>How to use toast notifications effectively</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Keep messages concise and clear</li>
                <li>Use appropriate colors to indicate message type</li>
                <li>Include actions when relevant</li>
                <li>Don't overuse toasts - reserve them for important information</li>
                <li>Position toasts consistently throughout your application</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
