import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden border rounded-lg">
      <CardContent className="p-0 relative">
        <Skeleton className="aspect-square w-full" />
      </CardContent>
      <div className="flex-grow p-4 bg-background flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
          </div>
          <div className="flex gap-2 items-baseline">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  )
}
