"use client"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter } from "lucide-react"

export function ProfileSheet() {
  // Use default values directly
  const user = {
    name: "Stephanie Schofield",
    email: "stephanie@example.com",
    image: "/stephanie-profile.jpeg",
    location: "San Francisco, CA",
    joinDate: "January 2020",
    bio: "Passionate developer and designer creating beautiful digital experiences.",
    skills: ["React", "TypeScript", "Next.js", "UI/UX Design"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <span className="sr-only">Open profile</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-left">
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>View and manage your profile information.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Location</h4>
            <p className="text-sm text-muted-foreground">{user.location}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Member since</h4>
            <p className="text-sm text-muted-foreground">{user.joinDate}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Bio</h4>
            <p className="text-sm text-muted-foreground">{user.bio}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user.skills?.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Social Links</h4>
            <div className="flex gap-2">
              <a
                href={user.socialLinks?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={user.socialLinks?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={user.socialLinks?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
