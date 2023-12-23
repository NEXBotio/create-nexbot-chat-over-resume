"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/useConfig"
interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string
}

export function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const [config] = useConfig()

  return (

    <div
      className={cn(
        `theme-${defaultTheme || config.theme}`,
        "w-full",
        className
      )}
      style={
        {
          "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
        } as React.CSSProperties
      }
    >

      {children}
 
    </div>
    
  )
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>
          <TooltipProvider>
          <ThemeWrapper>    {children}</ThemeWrapper>
            </TooltipProvider>
  </NextThemesProvider>
}
