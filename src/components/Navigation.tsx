"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import SiteHeaderDropDown from "@/components/SiteHeaderDropDown";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 fixed hidden md:flex">
      <Link href="/?noRedirect" className="mr-6 flex items-center space-x-2">
        <Icons.blackHole className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block ">
          <SiteHeaderDropDown/>
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {/* <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            (pathname === "/"||!pathname) ? "text-foreground" : "text-foreground/60"
          )}
        >
          Posts
        </Link> */}
        {/* <Link
          href="/about/orlando"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/about")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          About
        </Link> */}
       
        {/* <Link
          href={siteConfig.links.github}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          GitHub
        </Link> */}
      </nav>
    </div>
  );
}
