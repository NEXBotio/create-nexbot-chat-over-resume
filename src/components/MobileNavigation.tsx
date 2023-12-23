"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { ViewVerticalIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SiteName from "./SiteName"
import DropDownList from "./DropDownList"

export function MobileNavigation() {
  const [open, setOpen] = React.useState(false)
  const[close,setClose]=React.useState(false)

React.useEffect(()=>{
  if(close){
    setOpen(false)
  }
},[close])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          
          <ViewVerticalIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="">
   
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
    <div className="">
                    
                    </div>  <SiteName/>
                    
        </MobileLink>

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 ">
          
            <ul className="grid gap-y-3 md:gap-x-3 p-2 md:p-6 md:w-[400px] w-full lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li>   </li>
<DropDownList setClose={setClose}/>
            </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}