"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Check, ArrowRight } from "lucide-react"

export default function VerifyPage() {
  const [value, setValue] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const handleVerify = () => {
    if (value.length === 6) {
      setIsVerified(true)
      setIsDialogOpen(true)
    }
  }

  const handleContinue = () => {
    setIsDialogOpen(false)
    router.push("/")
  }

  return (
    <div className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a verification code to your email. Please enter the 6-digit code below.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>

          <div className="text-center">
            <Button onClick={handleVerify} disabled={value.length !== 6} className="w-full">
              Verify Email
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Didn't receive a code? <button className="text-primary hover:underline">Resend Code</button>
            </p>
          </div>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Verified Successfully!</DialogTitle>
            <DialogDescription>Your email has been verified. You can now continue to your account.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <Button onClick={handleContinue} className="w-full">
            Continue to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
