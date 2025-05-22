import { Skeleton } from "@/components/ui/skeleton"

export default function PortfolioLoading() {
  return (
    <div className="space-y-10 py-10">
      {/* Header Skeleton */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <div className="hidden md:flex space-x-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
      </div>

      {/* About Section Skeleton */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
      </div>

      {/* Skills Section Skeleton */}
      <div className="container mx-auto px-4 py-10 bg-gray-50">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Grid Skeleton */}
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
