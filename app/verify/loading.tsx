export default function Loading() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mx-auto animate-pulse"></div>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-10 h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>

          <div className="text-center">
            <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="mt-4 h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
