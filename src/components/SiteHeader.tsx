import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
// import { CommandMenu } from "@/components/CommandMenu"
import { Icons } from "@/components/ui/icons"
import  {MainNav}  from "@/components/Navigation"
import { MobileNavigation } from "@/components/MobileNavigation"
import { ModeToggle } from "@/components/ModeToggle"
import { buttonVariants } from "@/components/ui/button"
import { ThemeCustomizer } from "./ThemeCustomizer"

export function SiteHeader() {
  return (
    <header className="fixed   top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container  flex h-14 items-center">
        <MainNav />
        <MobileNavigation />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex  items-center">
          <Link
              href="/"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.blackHole className="md:hidden h-4 w-4" />
                <span className="sr-only">home</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            {/* <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <ModeToggle />
            <div className="theme-customizer-container top-4 right-2 fixed">
            <ThemeCustomizer/>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}