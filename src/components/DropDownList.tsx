"use client"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ListItemProps {
    setClose:  React.Dispatch<React.SetStateAction<boolean>>
    title: string
    children: React.ReactNode
    href?: string
    target?: string
}

const ListItem: React.FC<ListItemProps> = ({ title,setClose, children, href, target,...props }) => {
    return (
        <li>
            {href ? (
                <Link target={target}
                onClick={()=>{setClose(true)}}
                href={href} passHref>
                    <div
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </div>
                </Link>) :
                (<div
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none"
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </div>
                )}
        </li>
    )
}

export default function DropDownList({setClose}: {setClose:  React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <>
            <ListItem setClose={setClose}  href="/" title="Home">
                See my latest updates.
            </ListItem>
            <ListItem setClose={setClose}  href={siteConfig.links.github} title="Code" target={'_blank'}>
                Visit our GitHub repo to see the source code.
            </ListItem>
        </>)


}