import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { env } from 'process'
export async function GET(request: Request) {
  console.log('request', request)
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,//server!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY! )

    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    const select = supabaseClient.from('users').select('*').eq('id', data?.user?.id)
    const { data: userData, error: userError } = await select
    console.log('userData', userData)
    if (userData?.length === 0 || !userData || userData == null) {

      await supabaseClient.from('users').insert([{ id: data?.user?.id }])
      await supabaseClient.from('subscriptions').insert([{ user_id: data?.user?.id,expiresat:null }])

    }
    if (!error) {

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}