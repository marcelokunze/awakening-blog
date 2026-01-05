import { CategoryBadge } from "@/components/category-badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'
import { CategoryType } from '@/lib/mdx'

interface BlogCardProps {
  category: CategoryType
  title: string
  description: string
  date: string
  readTime: string
}

export function BlogCard({ category, title, description, date, readTime }: BlogCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-colors hover:bg-accent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CategoryBadge category={category} className="mb-2"/>
        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </CardHeader>
      <CardContent>
        <h3 className="mb-4 text-xl font-medium text-foreground">{title}</h3>
        <p className="mb-6 text-sm text-muted-foreground">{description}</p>
        <div className="text-xs text-muted-foreground">
          {date} — {readTime}
        </div>
      </CardContent>
    </Card>
  )
}




