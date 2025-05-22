"use client"

import { useEffect, useRef } from "react"
import lottie from "lottie-web"

export default function LottieSection() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      const animation = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://assets5.lottiefiles.com/packages/lf20_UJNc7DcLfy.json", // Example animation
      })

      return () => animation.destroy()
    }
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Creative Process</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our approach combines artistic vision with technical precision
          </p>
        </div>
        <div className="flex justify-center">
          <div ref={container} className="w-full max-w-2xl h-64 md:h-96" />
        </div>
      </div>
    </section>
  )
}
