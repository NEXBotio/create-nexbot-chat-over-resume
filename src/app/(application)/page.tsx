import { createSupaServerClient } from "@/lib/supabase-server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { string } from "zod"


export default async function Page({
  
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = await createSupaServerClient()
  const userResp = await supabase.auth.getUser()

  if (!searchParams.noRedirect&& userResp.data.user) {
    redirect(`/dashboard`)

  }
  else {
    return (<div >HOME</div>)

  }
}
