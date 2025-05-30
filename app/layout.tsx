import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Stephanie Schofield - Personal Portfolio",
  description: "Personal portfolio website showcasing my work and skills",
  generator: "v0.dev",
  icons: {
    icon: "/stephanie-profile.jpeg",
    apple: "/stephanie-profile.jpeg",
  },
  openGraph: {
    title: "Stephanie Schofield - Personal Portfolio",
    description: "Personal portfolio website showcasing my work and skills",
    images: [
      {
        url: "/stephanie-profile.jpeg",
        width: 800,
        height: 800,
        alt: "Stephanie Schofield",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stephanie Schofield - Personal Portfolio",
    description: "Personal portfolio website showcasing my work and skills",
    images: ["/stephanie-profile.jpeg"],
    creator: "@stephanieschofield",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
