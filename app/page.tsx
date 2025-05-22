"use client"

import { useRouter } from "next/navigation"
import ParticleHero from "@/components/ParticleHero"

export default function Home() {
  const router = useRouter()

  const handleExploreClick = () => {
    router.push("/portfolio")
  }

  return <ParticleHero onExploreClick={handleExploreClick} />
}
