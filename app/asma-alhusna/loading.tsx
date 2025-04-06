import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 mx-auto mb-6">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <Skeleton className="h-10 w-full mb-6" />

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-20" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="pb-2 text-center">
              <Skeleton className="h-8 w-32 mx-auto" />
              <Skeleton className="h-4 w-24 mx-auto mt-2" />
            </CardHeader>
            <CardContent className="text-center">
              <Skeleton className="h-16 w-full mb-2" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

