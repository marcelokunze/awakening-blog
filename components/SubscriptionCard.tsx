'use client'

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface SubscriptionCardProps {
  currentTier: string
}

export default function SubscriptionCard({ currentTier }: SubscriptionCardProps) {
  const router = useRouter()
  return (
    <Card className="w-full max-w-sm bg-card mx-auto">
      <CardHeader>
        <h3 className="text-lg font-medium">Subscription</h3>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Current plan</span>
          <span className="text-sm font-medium text-foreground">
            {currentTier}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => router.push('/pricing')}
        >
          Upgrade plan
        </Button>
      </CardFooter>
    </Card>
  )
}
