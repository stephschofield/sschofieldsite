"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Check, AlertTriangle } from "lucide-react"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const token = searchParams?.get("token") || ""
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    // Simulate verification process
    const verifyToken = async () => {
      try {
        // In a real app, you would verify the token with your backend
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // For demo purposes, we'll consider any token valid
        if (token) {
          setStatus("success")
        } else {
          setStatus("error")
        }
      } catch (error) {
        setStatus("error")
      }
    }

    verifyToken()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Email Verification</h1>

        {status === "loading" && (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying your email address...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Successful</h2>
            <p className="text-gray-600 mb-6">Your email has been successfully verified.</p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">The verification link is invalid or has expired.</p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
