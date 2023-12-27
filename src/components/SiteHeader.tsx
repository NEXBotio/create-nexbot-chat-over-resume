import Link from "next/link"
import { cn } from "@/lib/utils"
// import { CommandMenu } from "@/components/CommandMenu"
import { Icons } from "@/components/ui/icons"
import { MainNav } from "@/components/Navigation"
import { MobileNavigation } from "@/components/MobileNavigation"
import { buttonVariants } from "@/components/ui/button"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { LogoutButton } from "./logout-button"
import { ProfileMenu } from "./profile-menu"

export async function SiteHeader() {

  const cookieStore = cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,//server!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const handleLogOut = async () => {
    supabase.auth.signOut()
  }
  const userResp = await supabase.auth.getUser()
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
              href="/?noRedirect"
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
            {!userResp.data.user && (<Link
              href={'/signup'}
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
                Sign up

              </div>
            </Link>)}
            
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
            <div className="hidden md:block fixed  mr-5 right-0">
            {userResp.data.user ? (  <ProfileMenu />):<Link

href={'/login'}
rel="noreferrer"
>
<div
  className={
    "w-9 px-9  text-x"
  }
>
  Login
</div>
</Link>}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}