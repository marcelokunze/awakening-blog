import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const categoryStyles = {
 Science: "bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30",
 "Guide & Tips": "bg-green-400/10 text-green-400 hover:bg-green-400/20", 
 Techniques: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
 Origins: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
 Journey: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20",
 Product: "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20"
} as const

export type CategoryType = keyof typeof categoryStyles

interface CategoryBadgeProps {
 category: CategoryType
 className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
 return (
   <Badge 
     variant="secondary" 
     className={cn(categoryStyles[category], className)}
   >
     {category}
   </Badge>
 )
}