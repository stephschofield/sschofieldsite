"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { CheckCircle2, Info, XCircle, Bell, FileText } from "lucide-react"

export function ToastDemo() {
  const { toast } = useToast()

  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "Your action was completed successfully.",
      variant: "default",
      action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
    })
  }

  const showErrorToast = () => {
    toast({
      title: "Error!",
      description: "There was a problem with your request.",
      variant: "destructive",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }

  const showInfoToast = () => {
    toast({
      title: "Information",
      description: "Just letting you know about something.",
      action: <ToastAction altText="Got it">Got it</ToastAction>,
    })
  }

  const showReminderToast = () => {
    toast({
      title: "Reminder",
      description: "Don't forget about your upcoming meeting.",
      action: <ToastAction altText="View calendar">View calendar</ToastAction>,
    })
  }

  const showUpdateToast = () => {
    toast({
      title: "Portfolio Updated",
      description: "Your portfolio has been updated with new projects.",
      action: <ToastAction altText="View changes">View changes</ToastAction>,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Button onClick={showSuccessToast} className="flex items-center">
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Success Toast
      </Button>
      <Button onClick={showErrorToast} variant="destructive" className="flex items-center">
        <XCircle className="mr-2 h-4 w-4" />
        Error Toast
      </Button>
      <Button onClick={showInfoToast} variant="outline" className="flex items-center">
        <Info className="mr-2 h-4 w-4" />
        Info Toast
      </Button>
      <Button onClick={showReminderToast} variant="secondary" className="flex items-center">
        <Bell className="mr-2 h-4 w-4" />
        Reminder Toast
      </Button>
      <Button onClick={showUpdateToast} variant="default" className="flex items-center">
        <FileText className="mr-2 h-4 w-4" />
        Update Toast
      </Button>
    </div>
  )
}
