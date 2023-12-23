"use client"

import * as React from "react"
import { Icons } from "@/components/ui/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/NavigationMenu"
import SiteName from "@/components/SiteName"
import DropDownList from "@/components/DropDownList"
import { siteConfig } from "@/config/site"


export function SiteHeaderDropDown() {
  const [open, setOpen] = React.useState(true)
  const [close,setClose]=React.useState(false)
  
  React.useEffect(()=>{
    if(close){
      setOpen(false)
    }
  },[close])
  if(open){return ( <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
<SiteName/>
            </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className=""
                    href="/"
                  >
                    <div className="flex place-content-center justify-center">
                    <Icons.blackHole className="h-40  lg:pt-2   w-40" />
                    </div>
                    <div className="relative flex place-content-center  lg:mt-20 lg:pt-8 bottom-0">
                      {siteConfig.name}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      
                    </p>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
<DropDownList setClose={setClose}/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        
      </NavigationMenuList>
    </NavigationMenu>)
}
else return null
}
export default SiteHeaderDropDown
