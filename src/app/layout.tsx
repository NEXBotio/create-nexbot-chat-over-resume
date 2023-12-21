import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from '@/providers/theme-provider'
import Link from 'next/link'
import { TailwindIndicator } from '@/components/TailwindIndicator'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header
            className='  text-black flex-row-reverse bg-red-50 h-20 w-full flex items-center'
          >
            <div className='flex mx auto mr-10 gap-3 '>
              <div className=''>Sign up</div>
              <div className=''>

                <Link href={'/dashboard'}>Log in</Link></div>
            </div>

          </header>
          <div className="pb-8 flex-1"><main
            className=" container pt-20 relative  bg-green-200"
          >{children}</main></div>)

        </ThemeProvider>
        <TailwindIndicator />
      </body>
    </html>
  )
}
