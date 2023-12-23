"use client"

import * as React from "react"
import {
    CheckIcon,

} from "@radix-ui/react-icons"

import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/useConfig"



import { Skeleton } from "@/components/ui/skeleton"
import { themes } from "@/registry/themes"

import "@/styles/mdx.css"


import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function ThemeCustomizer() {
    const [config, setConfig] = useConfig()
    const { resolvedTheme: mode } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])


    return (
        <div className="flex items-center space-x-2">
            <div className="hidden md:flex">
                <div className="mr-2 hidden items-center space-x-0.5 lg:flex">
                    {mounted ? (
                        <>
                            {["zinc", "rose", "blue", "green", "orange"].map((color) => {
                                const theme = themes.find((theme) => theme.name === color)
                                const isActive = config.theme === color

                                if (!theme) {
                                    return null
                                }

                                return (
                                    <Tooltip key={theme.name}>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={() =>{
                                                    setConfig({
                                                        ...config,
                                                        theme: theme.name,
                                                    })}
                                                }
                                                className={cn(
                                                    "flex h-5 w-5 items-center justify-center rounded-full border-2 text-xs",
                                                    isActive
                                                        ? "border-[--theme-primary]"
                                                        : "border-transparent"
                                                )}
                                                style={
                                                    {
                                                        "--theme-primary": `hsl(${theme?.activeColor[
                                                            mode === "dark" ? "dark" : "light"
                                                            ]
                                                            })`,
                                                    } as React.CSSProperties
                                                }
                                            >
                                                <span
                                                    className={cn(
                                                        "flex h-4 w-4 items-center justify-center rounded-full bg-[--theme-primary]"
                                                    )}
                                                >
                                                    {isActive && (
                                                        <CheckIcon className="h-3 w-3 text-white" />
                                                    )}
                                                </span>
                                                <span className="sr-only">{theme.label}</span>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            align="center"
                                            className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
                                        >
                                            {theme.label}
                                        </TooltipContent>
                                    </Tooltip>
                                )
                            })}
                        </>
                    ) : (
                        <div className="mr-1 flex items-center space-x-3">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}