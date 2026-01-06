import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const PromoCard = () => {
 return (
   <Card className="mx-4 my-6 md:my-12 md:mx-auto md:max-w-6xl overflow-hidden border-white rounded-lg">
     <CardContent className="p-6 md:p-12">
       <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
         <div
           className="flex items-center justify-center max-h-72 mb-24 md:mb-0"
           style={{ aspectRatio: "4/3" }}
         >
           <img
             src="/awakening-blog-icon-light.svg"
             alt="Awakening Blog"
             className="block dark:hidden h-48 w-48 md:h-64 md:w-64"
           />
           <img
             src="/awakening-blog-icon-dark.svg"
             alt="Awakening Blog"
             className="hidden dark:block h-48 w-48 md:h-64 md:w-64"
           />
         </div>
         <div className="flex flex-col justify-center space-y-8 md:space-y-0">
          <div className="max-w-md mx-auto md:mx-0 space-y-6 md:space-y-4 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-foreground">
              Install your blog structure and focus on the content
            </h1>
            <p className="text-base text-muted-foreground">
              A ready to use blog template, easily customizable with support for custom react components and optimized for modern SEO.
            </p>
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
         </div>
       </div>
     </CardContent>
   </Card>
 )
}

export default PromoCard