import { Button } from "@/components/ui/button"

export default function TOCPromoCard() {
  return (
    <div className="rounded-lg bg-card p-4 text-center space-y-4">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">
          Give your mind some peace
        </h2>
        <p className="text-sm text-muted-foreground">
          Discover generative science-backed guided deep rest.
        </p>
      </div>
      
      <a 
        href="https://www.zenpersonal.app"
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