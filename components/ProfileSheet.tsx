"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Save } from "lucide-react"

export function ProfileSheet() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "Stephanie Schofield",
    email: "hello@example.com",
    phone: "+1 (555) 000-0000",
    location: "Sydney, Australia",
    bio: "Product designer and developer with over 8 years of experience creating digital products that solve real problems. My approach combines minimalist design principles with cutting-edge technology.",
    role: "Product Designer & Developer",
    availability: "available",
    experience: "8+ years",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Saving profile:", formData)
    setIsEditing(false)
    // Here you would typically save to a database
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/diverse-group.png" alt="Profile" />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>My Profile</SheetTitle>
          <SheetDescription>
            {isEditing ? "Edit your profile information below." : "View your profile information."}
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <div className="flex items-center justify-center mb-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/diverse-group.png" alt="Profile" />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={formData.role} onChange={(e) => handleChange("role", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select value={formData.availability} onValueChange={(value) => handleChange("availability", value)}>
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available for Work</SelectItem>
                    <SelectItem value="limited">Limited Availability</SelectItem>
                    <SelectItem value="unavailable">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">{formData.name}</h3>
                  <p className="text-sm text-muted-foreground">{formData.role}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p className="text-sm">{formData.email}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p className="text-sm">{formData.phone}</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p className="text-sm">{formData.location}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p className="text-sm">Experience: {formData.experience}</p>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={
                        formData.availability === "available"
                          ? "text-green-500 font-medium"
                          : formData.availability === "limited"
                            ? "text-yellow-500 font-medium"
                            : "text-red-500 font-medium"
                      }
                    >
                      {formData.availability === "available"
                        ? "Available for Work"
                        : formData.availability === "limited"
                          ? "Limited Availability"
                          : "Not Available"}
                    </span>
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">{formData.bio}</p>
              </div>
            </div>
          )}
        </div>

        <SheetFooter>
          {isEditing ? (
            <div className="flex w-full gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="w-full">
              Edit Profile
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
