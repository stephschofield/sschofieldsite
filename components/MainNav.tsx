"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Flowspace",
    href: "/projects/flowspace",
    description: "A productivity tool that helps teams organize their workflow with a visual, intuitive interface.",
  },
  {
    title: "Mindfull",
    href: "/projects/mindfull",
    description: "A meditation app designed to help busy professionals find moments of calm throughout their day.",
  },
  {
    title: "Palette",
    href: "/projects/palette",
    description:
      "A color management system for designers that simplifies the process of creating cohesive color schemes.",
  },
  {
    title: "Typeform",
    href: "/projects/typeform",
    description:
      "A typography exploration tool that helps designers find the perfect font combinations for their projects.",
  },
]

const services = [
  {
    title: "UI/UX Design",
    href: "#services",
    description: "Creating intuitive and beautiful user interfaces that enhance user experience.",
  },
  {
    title: "Web Development",
    href: "#services",
    description: "Building responsive, performant websites and web applications using modern technologies.",
  },
  {
    title: "Mobile Development",
    href: "#services",
    description: "Developing cross-platform mobile applications that work seamlessly on iOS and Android.",
  },
  {
    title: "Brand Identity",
    href: "#services",
    description: "Crafting cohesive brand identities that communicate your values and resonate with your audience.",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/#about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {services.map((service) => (
                <ListItem key={service.title} title={service.title} href={service.href}>
                  {service.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {projects.map((project) => (
                <ListItem key={project.title} title={project.title} href={project.href}>
                  {project.description}
                </ListItem>
              ))}
              <ListItem
                href="/projects"
                title="All Projects"
                className="col-span-full bg-gradient-to-r from-primary/20 to-primary/5 p-3"
              >
                View all of my projects in one place
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/#contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <Link href={props.href || "#"} legacyBehavior passHref>
          <NavigationMenuLink asChild>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className,
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
            </a>
          </NavigationMenuLink>
        </Link>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
