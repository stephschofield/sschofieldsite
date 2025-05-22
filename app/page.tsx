"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowDown, Moon, Sun } from "lucide-react"

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const explosionCenterRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768) // Set mobile breakpoint
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
      velocityX?: number
      velocityY?: number
      alpha?: number
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

      // Set explosion center to the center of the canvas
      explosionCenterRef.current = {
        x: canvas.width / 2,
        y: canvas.height / 2,
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
      const colors = ["#1E88E5", "#43A047", "#E53935", "#5E35B1", "#FB8C00"]
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
        alpha: 1,
      }
    }

    function createInitialParticles(scale: number) {
      // Doubled particle density - from 0.8 to 1.6 particles per pixel
      const particlesPerPixel = 1.6 // Target particles per text pixel
      const targetCount = Math.floor(textPixels.length * particlesPerPixel)
      const maxParticles = 80000 // Doubled max cap for performance reasons
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

    function explodeParticles() {
      const { x: centerX, y: centerY } = explosionCenterRef.current

      // Add explosion velocity to each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Calculate angle and distance from explosion center
        const dx = p.x - centerX
        const dy = p.y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy) || 1
        const angle = Math.atan2(dy, dx)

        // Randomize explosion velocity based on distance from center
        const speed = 5 + Math.random() * 15 + distance * 0.02

        p.velocityX = Math.cos(angle) * speed
        p.velocityY = Math.sin(angle) * speed
        p.alpha = 1
      }
    }

    let animationFrameId: number
    let explosionStartTime = 0

    function animate(timestamp: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#f8f9fa" // Light gray background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 240

      // Calculate explosion progress
      let explosionProgress = 0
      const explosionDuration = 1500 // 1.5 seconds

      if (isExploding) {
        if (explosionStartTime === 0) {
          explosionStartTime = timestamp
          explodeParticles()
        }

        explosionProgress = Math.min((timestamp - explosionStartTime) / explosionDuration, 1)

        // If explosion is complete, show about section
        if (explosionProgress >= 1) {
          setShowAbout(true)
          cancelAnimationFrame(animationFrameId)
          return
        }
      }

      // Process particles in chunks for better performance with high particle counts
      const chunkSize = 5000
      const totalChunks = Math.ceil(particles.length / chunkSize)

      for (let chunk = 0; chunk < totalChunks; chunk++) {
        const start = chunk * chunkSize
        const end = Math.min(start + chunkSize, particles.length)

        for (let i = start; i < end; i++) {
          const p = particles[i]

          if (isExploding) {
            // Update position based on explosion velocity
            p.x += p.velocityX || 0
            p.y += p.velocityY || 0

            // Fade out particles
            if (p.alpha) p.alpha -= 0.01

            // Apply gravity
            if (p.velocityY !== undefined) {
              p.velocityY += 0.05
            }

            ctx.globalAlpha = Math.max(0, p.alpha || 0)
            ctx.fillStyle = p.scatteredColor
          } else {
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

            ctx.globalAlpha = 1
          }

          ctx.fillRect(p.x, p.y, p.size, p.size)

          // Only handle particle lifecycle if not exploding
          if (!isExploding) {
            p.life--
            if (p.life <= 0) {
              const newParticle = createParticle(0)
              if (newParticle) {
                particles[i] = newParticle
              } else {
                particles.splice(i, 1)
                i--
              }
            }
          }
        }
      }

      // Maintain high particle count (only if not exploding)
      if (!isExploding && particles.length < textPixels.length * 1.4) {
        // Target slightly below max to avoid constant regeneration
        const batchSize = Math.min(50, textPixels.length - particles.length)
        for (let i = 0; i < batchSize; i++) {
          const newParticle = createParticle(0)
          if (newParticle) particles.push(newParticle)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animationFrameId = requestAnimationFrame(animate)

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
  }, [isMobile, isExploding])

  const handleExploreClick = () => {
    setIsExploding(true)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <>
      {!showAbout ? (
        <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-gray-50">
          <canvas
            ref={canvasRef}
            className="w-full h-full absolute top-0 left-0 touch-none"
            aria-label="Interactive particle effect with 'Welcome to my office' text"
          />
          <div className="absolute bottom-[100px] text-center z-10">
            <p className="font-mono text-gray-700 text-xs sm:text-base md:text-sm">
              <button
                onClick={handleExploreClick}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center gap-2"
                disabled={isExploding}
              >
                Explore my work
                <ArrowDown className="w-4 h-4" />
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-white">
          {/* Navigation */}
          <header className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hbBiPP3wEnkrS40Tho7Z5FqwgdmdCG.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <nav className="flex items-center space-x-8">
              <a href="#work" className="text-gray-900 hover:text-blue-600 transition-colors">
                Work
              </a>
              <a href="#about" className="text-gray-900 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-900 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-6">Digital Craftsman</h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Where minimal design meets digital artistry. I craft elegant experiences that inspire and elevate your
                  digital presence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#work"
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                  >
                    Explore Our Work
                  </a>
                  <a
                    href="#about"
                    className="px-6 py-3 text-gray-700 hover:text-blue-600 font-medium flex items-center transition-colors"
                  >
                    Learn more →
                  </a>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hbBiPP3wEnkrS40Tho7Z5FqwgdmdCG.png"
                  alt="3D illustration of design tool"
                  className="w-full max-w-md mx-auto lg:ml-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section id="work" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">My Products</h2>

              {/* Product 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                <div className="order-2 lg:order-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Wear Your Story</h3>
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    Every piece from my collection is a canvas for your unique narrative. Our designs blend minimal
                    aesthetics with nature's beauty, allowing you to express your individuality.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                  >
                    Explore Collection →
                  </a>
                </div>
                <div className="order-1 lg:order-2">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YI0y8MSWNGnO16W9ijMRUFyYHfqQDL.png"
                    alt="Product showcase"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Product 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                <div>
                  <img
                    src="/productivity-app-interface.png"
                    alt="Productivity app interface"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Flowspace</h3>
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    A productivity tool that helps teams organize their workflow with a visual, intuitive interface.
                    Designed for clarity and efficiency.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Project →
                  </a>
                </div>
              </div>

              {/* Product 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mindfull</h3>
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    A meditation app designed to help busy professionals find moments of calm throughout their day.
                    Simple, beautiful, and effective.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Project →
                  </a>
                </div>
                <div className="order-1 lg:order-2">
                  <img
                    src="/meditation-app-interface.png"
                    alt="Meditation app interface"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Us</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-8 border border-gray-100 rounded-lg">
                  <div className="text-amber-500 mb-4">✨</div>
                  <h3 className="text-xl font-semibold mb-3">Minimal Design</h3>
                  <p className="text-gray-600">Clean aesthetics that put your content in the spotlight.</p>
                </div>

                <div className="p-8 border border-gray-100 rounded-lg">
                  <div className="text-blue-500 mb-4">📱</div>
                  <h3 className="text-xl font-semibold mb-3">Responsive</h3>
                  <p className="text-gray-600">Flawless experiences across all devices and screen sizes.</p>
                </div>

                <div className="p-8 border border-gray-100 rounded-lg">
                  <div className="text-red-500 mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-3">Fast Performance</h3>
                  <p className="text-gray-600">Lightning-quick load times for smooth user interactions.</p>
                </div>

                <div className="p-8 border border-gray-100 rounded-lg">
                  <div className="text-purple-500 mb-4">🌈</div>
                  <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                  <p className="text-gray-600">Inclusive design practices that work for all users.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hbBiPP3wEnkrS40Tho7Z5FqwgdmdCG.png"
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-8 items-center">
                <a href="#" className="text-gray-600 hover:text-blue-600 mb-4 md:mb-0 transition-colors">
                  Work
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 mb-4 md:mb-0 transition-colors">
                  About
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 mb-4 md:mb-0 transition-colors">
                  Contact
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-sm">© 2025 All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}
