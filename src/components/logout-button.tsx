"use client"

import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { MenubarItem } from "@/components/ui/menubar"
import { LogOut } from "lucide-react"




export function LogoutButton() {

  const router = useRouter()
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const handleLogOut = async () => {
    supabase.auth.signOut().then(() => {
    router.refresh()
    })
  }
  return (
    <MenubarItem>
    <LogOut className="mr-2 h-4 w-4"/>
    <button onClick={async () => await handleLogOut()} >              <div

    >
      Log out
    </div></button>
</MenubarItem>)
}