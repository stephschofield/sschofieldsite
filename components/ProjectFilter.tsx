"use client"

import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface ProjectFilterProps {
  onFilterChange: (category: string, sortBy: string) => void
  categories: string[]
}

export function ProjectFilter({ onFilterChange, categories }: ProjectFilterProps) {
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    onFilterChange(category, sortBy)
  }, [category, sortBy, onFilterChange])

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="space-y-2 flex-1">
        <label htmlFor="category-filter" className="text-sm font-medium">
          Filter by Category
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category-filter" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All Projects</SelectItem>
              <Separator className="my-1" />
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 flex-1">
        <label htmlFor="sort-filter" className="text-sm font-medium">
          Sort by
        </label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger id="sort-filter" className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="z-a">Z-A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
