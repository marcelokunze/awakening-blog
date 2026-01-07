import { Button } from "@/components/ui/button"

export default function TOCPromoCard() {
  return (
    <div className="rounded-lg bg-card p-4 text-center space-y-4">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">
          Install your blog structure.
        </h2>
        <p className="text-sm text-muted-foreground">
          A complete modern MDX blog structure with 1 install.
        </p>
      </div>
      
      <a 
        href="https://github.com/marcelokunze/awakening-blog"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button size="sm" variant="secondary" className="w-full">
          Learn More
        </Button>
      </a>
    </div>
  )
}




