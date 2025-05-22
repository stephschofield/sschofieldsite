"use client"

import { useRouter } from "next/navigation"
import ParticleHero from "@/components/ParticleHero"

export default function Home() {
  const router = useRouter()

  const handleExploreClick = () => {
    // Use window.location for more reliable navigation
    window.location.href = "/portfolio"
  }

  return <ParticleHero onExploreClick={handleExploreClick} />
}
