"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"


interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string
    src?: string
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
    navigator.clipboard.writeText(value)

}

export function CopyButton({
    value,
    className,
    src,
    ...props
}: CopyButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }, [hasCopied])

    return (
        <Button
            size="icon"
            variant="ghost"
            className={cn(
                " absolute top-[7px] right-[7px] h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
                className
            )}
            onClick={() => {
                copyToClipboardWithMeta(
                    value
                )
                setHasCopied(true)
            }}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? (
                <CheckIcon className="h-5 w-5" />
            ) : (
                <CopyIcon className="h-5 w-5" />
            )}
        </Button>
    )
}
export default CopyButton