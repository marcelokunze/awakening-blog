"use client"

import { Clock } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer"

interface InsufficientMinutesModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
  onHome: () => void
}

export function InsufficientMinutesModal({
  isOpen,
  onClose,
  onUpgrade,
  onHome,
}: InsufficientMinutesModalProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)")

  const titleContent = (
    <div className="flex items-center mb-2 space-x-2">
      <Clock strokeWidth={2.2} className="w-5 h-5 text-primary" />
      <span className="text-lg font-medium">Insufficient minutes</span>
    </div>
  )

  const descriptionContent = (
    <div className="text-foreground space-y-2">
      <p className="text-muted-foreground">
        You don&apos;t have enough minutes to create this session. <span className="font-regular">Upgrade to continue.</span></p>
    </div>
  )

  const buttonContent = (
    <div className={`mt-6 flex ${isDesktop ? "flex-row" : "flex-col"} gap-3`}>
      <Button className="w-full" onClick={onUpgrade}>
        Upgrade
      </Button>
      <Button variant="secondary" className="w-full" onClick={onHome}>
        Home
      </Button>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-black max-w-md">
          <DialogHeader>
            <DialogTitle asChild>{titleContent}</DialogTitle>
            <DialogDescription asChild>{descriptionContent}</DialogDescription>
          </DialogHeader>
          {buttonContent}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="px-4">
          <DrawerTitle asChild>{titleContent}</DrawerTitle>
          <DrawerDescription asChild>{descriptionContent}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="px-4 pt-0">
          {buttonContent}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
