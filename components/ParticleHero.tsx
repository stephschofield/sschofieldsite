"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

interface ParticleHeroProps {
  onExploreClick: () => void
}

export default function ParticleHero({ onExploreClick }: ParticleHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
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

      ctx.fillStyle = "#333333" // Dark gray text for better contrast on light background
      ctx.save()

      // Calculate text size based on canvas dimensions
      const fontSize = isMobile ? 64 : 140
      const welcomeText = "Welcome to"
      const officeText = "my office"

      ctx.font = `bold ${fontSize}px sans-serif`
      const welcomeWidth = ctx.measureText(welcomeText).width
      const officeWidth = ctx.measureText(officeText).width

      // Check if text is too wide for the canvas and adjust if needed
      const maxWidth = Math.max(welcomeWidth, officeWidth)
      const canvasWidth = canvas.width * 0.9 // Use 90% of canvas width

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

      // Store all text pixels for more efficient particle creation
      textPixels = []
      const data = textImageData.data
      const pixelGap = isMobile ? 2 : 1 // Sample every pixel on desktop for maximum density

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

      // Add slight randomness to position for more natural look
      const x = pixel.x + (Math.random() * 2 - 1)
      const y = pixel.y + (Math.random() * 2 - 1)

      // Generate a color from a gradient palette suitable for light mode
      const colors = [
        "#1E88E5", // Blue
        "#43A047", // Green
        "#E53935", // Red
        "#5E35B1", // Purple
        "#FB8C00", // Orange
      ]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      return {
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 0.8 + 0.2, // Even smaller particles for higher density
        color: "#555555", // Darker gray for particles on light background
        scatteredColor: randomColor,
        life: Math.random() * 100 + 50,
      }
    }

    function createInitialParticles(scale: number) {
      // Reduced particle density for better performance
      const particlesPerPixel = 0.8 // Target particles per text pixel
      const targetCount = Math.floor(textPixels.length * particlesPerPixel)
      const maxParticles = 40000 // Cap for performance reasons
      const particleCount = Math.min(targetCount, maxParticles)

      console.log(`Creating particles for ${textPixels.length} text pixels, target: ${particleCount}`)

      // Create particles in batches for better performance
      const batchSize = 1000
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

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#f8f9fa" // Light gray background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 240

      // Process particles in chunks for better performance with high particle counts
      const chunkSize = 5000
      const totalChunks = Math.ceil(particles.length / chunkSize)

      for (let chunk = 0; chunk < totalChunks; chunk++) {
        const start = chunk * chunkSize
        const end = Math.min(start + chunkSize, particles.length)

        for (let i = start; i < end; i++) {
          const p = particles[i]
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
            const force = (maxDistance - distance) / maxDistance
            const angle = Math.atan2(dy, dx)
            const moveX = Math.cos(angle) * force * 60
            const moveY = Math.sin(angle) * force * 60
            p.x = p.baseX - moveX
            p.y = p.baseY - moveY

            ctx.fillStyle = p.scatteredColor
          } else {
            p.x += (p.baseX - p.x) * 0.1
            p.y += (p.baseY - p.y) * 0.1
            ctx.fillStyle = p.color // Use the particle's default color
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

      // Maintain high particle count
      if (particles.length < textPixels.length * 0.7) {
        // Target slightly below max to avoid constant regeneration
        const batchSize = Math.min(50, textPixels.length - particles.length)
        for (let i = 0; i < batchSize; i++) {
          const newParticle = createParticle(scale)
          if (newParticle) particles.push(newParticle)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate()

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
  }, [isMobile])

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-gray-50">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with 'Welcome to my office' text"
      />
      <div className="absolute bottom-[100px] text-center z-10">
        <p className="font-mono text-gray-700 text-xs sm:text-base md:text-sm">
          <button
            onClick={onExploreClick}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center gap-2"
          >
            Explore my work
            <ArrowDown className="w-4 h-4" />
          </button>
        </p>
      </div>
    </div>
  )
}
