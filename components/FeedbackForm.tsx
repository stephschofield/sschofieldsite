"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Send, ThumbsUp, ThumbsDown, Smile, Frown, Meh } from "lucide-react"

const formSchema = z.object({
  rating: z.enum(["excellent", "good", "neutral", "poor", "terrible"], {
    required_error: "Please select a rating.",
  }),
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
  improvements: z.string().optional(),
})

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: undefined,
      feedback: "",
      improvements: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      form.reset()
      toast({
        title: "Feedback submitted",
        description: "Thank you for your valuable feedback!",
      })
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-sm border">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Share Your Feedback</h2>
          <p className="text-muted-foreground">
            Your feedback helps me improve my portfolio and services. I appreciate your honest thoughts!
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How would you rate your experience?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="excellent" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1 text-green-500" />
                          Excellent
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="good" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <Smile className="w-4 h-4 mr-1 text-green-400" />
                          Good
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="neutral" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <Meh className="w-4 h-4 mr-1 text-yellow-500" />
                          Neutral
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="poor" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <Frown className="w-4 h-4 mr-1 text-orange-500" />
                          Poor
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="terrible" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <ThumbsDown className="w-4 h-4 mr-1 text-red-500" />
                          Terrible
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What did you like about my portfolio?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I really liked the design and organization of your projects..."
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Please share what aspects of my portfolio stood out to you.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="improvements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What could be improved?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I think you could improve..."
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your suggestions help me make my portfolio better. This field is optional.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  )
}
