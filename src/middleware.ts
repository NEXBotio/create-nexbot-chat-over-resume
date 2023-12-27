import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function  middleware(request:NextRequest) {
    const unprotectedPaths = ['/', '/api/auth/callback', '/login','signup']
  if(unprotectedPaths.find(path=>path===request.nextUrl.pathname)) {
    return NextResponse.next()
  }


    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,//server!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )
  
    const sesh = await supabase.auth.getSession()
    console.log('sesh',)
    if(!sesh.data.session||sesh.data.session===null){
      console.log('redirecting')
      return NextResponse.redirect(new URL('/', request.url))
    } 
    return response
  
  }
  export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * Feel free to modify this pattern to include more paths.
       */
      '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
  }
