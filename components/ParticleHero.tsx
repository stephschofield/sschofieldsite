"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

interface ParticleHeroProps {
  onExploreClick?: () => void
}

export default function ParticleHero({ onExploreClick }: ParticleHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  // Set mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Set isMobile state only once on mount
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768
    setIsMobile(checkMobile())

    const handleResize = () => {
      setIsMobile(checkMobile())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Get theme-based colors
  const getThemeColors = () => {
    const isDark = resolvedTheme === "dark"

    return {
      background: isDark ? "#0a0a0a" : "#f8f9fa", // Dark background for dark mode
      textColor: isDark ? "#e5e5e5" : "#333333", // Light text for dark mode
      particleColor: isDark ? "#a1a1aa" : "#555555", // Light particles for dark mode
      scatteredColors: isDark
        ? [
            // Brighter blues for dark mode
            "#60A5FA", // Blue 400
            "#3B82F6", // Blue 500
            "#2563EB", // Blue 600
            "#1D4ED8", // Blue 700
            "#1E40AF", // Blue 800
            "#1E3A8A", // Blue 900
            "#7C3AED", // Violet 600
            "#8B5CF6", // Violet 500
            "#A855F7", // Purple 500
            "#C084FC", // Purple 400
            "#06B6D4", // Cyan 500
            "#0891B2", // Cyan 600
          ]
        : [
            // Original blues for light mode
            "#E3F2FD", // Light Blue 50
            "#BBDEFB", // Light Blue 100
            "#90CAF9", // Light Blue 200
            "#64B5F6", // Light Blue 300
            "#42A5F5", // Light Blue 400
            "#2196F3", // Light Blue 500
            "#1E88E5", // Light Blue 600
            "#1976D2", // Light Blue 700
            "#1565C0", // Light Blue 800
            "#0D47A1", // Light Blue 900
            "#0277BD", // Light Blue A700
            "#01579B", // Light Blue A900
          ],
    }
  }

  // Particle animation effect
  useEffect(() => {
    if (!mounted) return // Wait for theme to be resolved

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
    }[] = []

    let textImageData: ImageData | null = null
    let textPixels: { x: number; y: number }[] = [] // Store text pixel positions

    function createTextImage() {
      if (!ctx || !canvas) return 0

      const colors = getThemeColors()
      ctx.fillStyle = colors.textColor
      ctx.save()

      // Calculate text size to span across the page
      const baseViewportWidth = canvas.width
      const fontSize = isMobile ? baseViewportWidth * 0.2 : baseViewportWidth * 0.15
      const welcomeText = "Welcome to"
      const officeText = "my office"

      ctx.font = `bold ${fontSize}px sans-serif`
      const welcomeWidth = ctx.measureText(welcomeText).width
      const officeWidth = ctx.measureText(officeText).width

      // Check if text is too wide for the canvas and adjust if needed
      const maxWidth = Math.max(welcomeWidth, officeWidth)
      const canvasWidth = canvas.width * 0.98 // Use 98% of canvas width for maximum spanning

      let scaleFactor = 1
      if (maxWidth > canvasWidth) {
        scaleFactor = canvasWidth / maxWidth
      }

      const adjustedFontSize = fontSize * scaleFactor
      ctx.font = `bold ${adjustedFontSize}px sans-serif`

      const lineHeight = adjustedFontSize * 1.2

      // Center the text
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Draw the text
      ctx.fillText(welcomeText, canvas.width / 2, canvas.height / 2 - lineHeight / 2)
      ctx.fillText(officeText, canvas.width / 2, canvas.height / 2 + lineHeight / 2)

      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Store all text pixels for more efficient particle creation - MUCH DENSER
      textPixels = []
      const data = textImageData.data
      const pixelGap = 1 // Sample every pixel for maximum density on both mobile and desktop

      for (let y = 0; y < canvas.height; y += pixelGap) {
        for (let x = 0; x < canvas.width; x += pixelGap) {
          const alpha = data[(y * canvas.width + x) * 4 + 3]
          if (alpha > 128) {
            textPixels.push({ x, y })
          }
        }
      }

      return adjustedFontSize / 20 // Return a scale factor for particles
    }

    function createParticle(scale: number) {
      if (textPixels.length === 0) return null

      // Get a random pixel from the text
      const pixelIndex = Math.floor(Math.random() * textPixels.length)
      const pixel = textPixels[pixelIndex]

      // Reduce randomness for tighter particle concentration
      const x = pixel.x + (Math.random() * 1 - 0.5) // Reduced from 2 to 1
      const y = pixel.y + (Math.random() * 1 - 0.5) // Reduced from 2 to 1

      const colors = getThemeColors()
      const randomColor = colors.scatteredColors[Math.floor(Math.random() * colors.scatteredColors.length)]

      return {
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 0.6 + 0.2, // Slightly smaller particles for higher density
        color: colors.particleColor,
        scatteredColor: randomColor,
        life: Math.random() * 100 + 50,
      }
    }

    function createInitialParticles(scale: number) {
      // MUCH HIGHER particle density for concentrated letters
      const particlesPerPixel = 3.0 // Increased from 1.0 to 3.0 for much denser particles
      const targetCount = Math.floor(textPixels.length * particlesPerPixel)
      const maxParticles = 120000 // Increased from 40000 to 120000 for more particles
      const particleCount = Math.min(targetCount, maxParticles)

      console.log(`Creating particles for ${textPixels.length} text pixels, target: ${particleCount}`)

      // Create particles in batches for better performance
      const batchSize = 2000 // Increased batch size for faster creation
      let created = 0

      function createBatch() {
        if (created >= particleCount) return

        const currentBatch = Math.min(batchSize, particleCount - created)
        for (let i = 0; i < currentBatch; i++) {
          const particle = createParticle(scale)
          if (particle) {
            particles.push(particle)
            created++
          }
        }

        if (created < particleCount) {
          // Use setTimeout to avoid blocking the main thread
          setTimeout(createBatch, 0)
        } else {
          console.log(`Created ${created} particles`)
        }
      }

      createBatch()
    }

    let animationFrameId: number

    function animate(scale: number) {
      if (!ctx || !canvas) return

      const colors = getThemeColors()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = colors.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 240
      const colorDistance = 120 // Increased radius for color change

      // Process particles in larger chunks for better performance with high particle counts
      const chunkSize = 8000 // Increased chunk size for better performance
      const totalChunks = Math.ceil(particles.length / chunkSize)

      for (let chunk = 0; chunk < totalChunks; chunk++) {
        const start = chunk * chunkSize
        const end = Math.min(start + chunkSize, particles.length)

        for (let i = start; i < end; i++) {
          const p = particles[i]
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Apply movement effect based on maxDistance
          if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
            const force = (maxDistance - distance) / maxDistance
            const angle = Math.atan2(dy, dx)
            const moveX = Math.cos(angle) * force * 60
            const moveY = Math.sin(angle) * force * 60
            p.x = p.baseX - moveX
            p.y = p.baseY - moveY
          } else {
            p.x += (p.baseX - p.x) * 0.1
            p.y += (p.baseY - p.y) * 0.1
          }

          // Apply color change only to particles very close to cursor
          if (distance < colorDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
            ctx.fillStyle = p.scatteredColor // Use theme-appropriate color for particles under cursor
          } else {
            ctx.fillStyle = p.color // Use theme-appropriate default color
          }

          ctx.fillRect(p.x, p.y, p.size, p.size)

          p.life--
          if (p.life <= 0) {
            const newParticle = createParticle(scale)
            if (newParticle) {
              particles[i] = newParticle
            } else {
              particles.splice(i, 1)
              i--
            }
          }
        }
      }

      // Maintain high particle count - increased target
      if (particles.length < textPixels.length * 2.5) {
        // Target slightly below max to avoid constant regeneration
        const batchSize = Math.min(50, textPixels.length - particles.length) // Increased batch size
        for (let i = 0; i < batchSize; i++) {
          const newParticle = createParticle(scale)
          if (newParticle) particles.push(newParticle)
        }
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      const newScale = createTextImage()
      particles = []
      createInitialParticles(newScale)
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, mounted, resolvedTheme])

  // Get theme-appropriate background class
  const getBackgroundClass = () => {
    if (!mounted) return "bg-gray-50" // Default light background during SSR
    return resolvedTheme === "dark" ? "bg-gray-950" : "bg-gray-50"
  }

  return (
    <div className={`relative w-full h-screen flex flex-col items-center justify-center ${getBackgroundClass()}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with 'Welcome to my office' text"
      />

      {/* Centered call-to-action button */}
      <div className="absolute bottom-[100px] text-center z-10">
        <Link
          href="/portfolio"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full transition-colors duration-300 flex items-center gap-2 shadow-lg"
          onClick={(e) => {
            if (onExploreClick) {
              e.preventDefault()
              onExploreClick()
            }
          }}
        >
          Explore my work
          <ArrowDown className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
