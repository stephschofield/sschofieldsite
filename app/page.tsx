"use client"

import { useRouter } from "next/navigation"
import ParticleHero from "@/components/ParticleHero"

export default function Home() {
  const router = useRouter()

  const handleExploreClick = () => {
    try {
      router.push("/portfolio")
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  return <ParticleHero onExploreClick={handleExploreClick} />
}
