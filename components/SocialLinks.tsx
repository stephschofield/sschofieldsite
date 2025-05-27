"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function SocialLinks() {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <HoverCard>
          <Tooltip>
            <TooltipTrigger asChild>
              <HoverCardTrigger asChild>
                <a
                  href="https://github.com/stephschofield"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  <Github className="w-6 h-6" />
                  <span className="sr-only">GitHub</span>
                </a>
              </HoverCardTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Follow me on GitHub</p>
            </TooltipContent>
          </Tooltip>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="/stephanie-profile.jpeg" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@stephschofield</h4>
                <p className="text-sm">Check out my open-source projects and contributions on GitHub.</p>
                <div className="flex items-center pt-2">
                  <Button size="sm" className="h-8" asChild>
                    <a href="https://github.com/stephschofield" target="_blank" rel="noopener noreferrer">
                      Follow
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <Tooltip>
            <TooltipTrigger asChild>
              <HoverCardTrigger asChild>
                <a
                  href="https://www.linkedin.com/in/stephanieschofield/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </HoverCardTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Connect on LinkedIn</p>
            </TooltipContent>
          </Tooltip>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="/stephanie-profile.jpeg" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Stephanie Schofield</h4>
                <p className="text-sm text-muted-foreground">Product Designer & Developer</p>
                <p className="text-sm">
                  Connect with me on LinkedIn for professional updates and networking opportunities.
                </p>
                <div className="flex items-center pt-2">
                  <Button size="sm" className="h-8" asChild>
                    <a href="https://www.linkedin.com/in/stephanieschofield/" target="_blank" rel="noopener noreferrer">
                      Connect
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <Tooltip>
            <TooltipTrigger asChild>
              <HoverCardTrigger asChild>
                <a
                  href="mailto:steph.schofield@outlook.com"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                  <span className="sr-only">Email</span>
                </a>
              </HoverCardTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send me an email</p>
            </TooltipContent>
          </Tooltip>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="/stephanie-profile.jpeg" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Contact Me</h4>
                <p className="text-sm">
                  Email me at <span className="font-medium">steph.schofield@outlook.com</span> for inquiries about
                  projects, collaborations, or speaking engagements.
                </p>
                <div className="flex items-center pt-2">
                  <Button
                    size="sm"
                    className="h-8"
                    onClick={() => (window.location.href = "mailto:steph.schofield@outlook.com")}
                  >
                    Send Email
                  </Button>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </TooltipProvider>
  )
}
