import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

export default function IslamicWallpapersLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-64 mx-auto mb-6" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <Skeleton className="h-10 w-full mb-6" />

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-8 w-20" />
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <Skeleton className="aspect-[3/4] w-full" />
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-6 w-20" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}

