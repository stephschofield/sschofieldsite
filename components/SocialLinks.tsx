"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"
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
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-5 h-5" />
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
                <AvatarImage src="/diverse-group.png" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@stephanieschofield</h4>
                <p className="text-sm">Check out my open-source projects and contributions on GitHub.</p>
                <div className="flex items-center pt-2">
                  <Button size="sm" className="h-8">
                    Follow
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
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </HoverCardTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Follow me on Twitter</p>
            </TooltipContent>
          </Tooltip>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="/diverse-group.png" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@stephanieschofield</h4>
                <p className="text-sm">
                  Follow me for updates on my latest projects, design tips, and industry insights.
                </p>
                <div className="flex items-center pt-2">
                  <Button size="sm" className="h-8">
                    Follow
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
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
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
                <AvatarImage src="/diverse-group.png" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Stephanie Schofield</h4>
                <p className="text-sm text-muted-foreground">Product Designer & Developer</p>
                <p className="text-sm">
                  Connect with me on LinkedIn for professional updates and networking opportunities.
                </p>
                <div className="flex items-center pt-2">
                  <Button size="sm" className="h-8">
                    Connect
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
                <a href="mailto:hello@example.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="w-5 h-5" />
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
                <AvatarImage src="/diverse-group.png" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Contact Me</h4>
                <p className="text-sm">
                  Email me at <span className="font-medium">hello@example.com</span> for inquiries about projects,
                  collaborations, or speaking engagements.
                </p>
                <div className="flex items-center pt-2">
                  <Button size="sm" className="h-8" onClick={() => (window.location.href = "mailto:hello@example.com")}>
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
