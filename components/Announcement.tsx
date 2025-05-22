import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function Announcement() {
  return (
    <div className="container mx-auto px-4 py-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Available for new projects</AlertTitle>
        <AlertDescription>
          I'm currently accepting new client projects for Q3 2024. Get in touch to discuss your project!
        </AlertDescription>
      </Alert>
    </div>
  )
}
