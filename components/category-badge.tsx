import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CategoryType } from "@/lib/mdx"

// Default category styles - customize these for your blog
const categoryStyles: Record<string, string> = {
  General: "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20",
  Tutorial: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  Guide: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  News: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  Opinion: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  Origins: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
}

interface CategoryBadgeProps {
  category: CategoryType
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const style = categoryStyles[category] || categoryStyles.General
  
  return (
    <Badge 
      variant="secondary" 
      className={cn(style, className)}
    >
      {category}
    </Badge>
  )
}

