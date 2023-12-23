import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/app/globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { cn } from "@/lib/utils"
import { fontSans } from "@/lib/fonts"
import { Provider } from 'jotai';
import { Footer } from "@/components/Footer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";


import "@/app/themes.css";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon:[ {
       media: '(prefers-color-scheme: light)',
       url: '/images/favicon-dark-gradient32.png',
       href: '/images/favicon-dark-gradient32.png'
     },
     {
       media: '(prefers-color-scheme: dark)',
       url: '/images/favicon-light-gradient-black-bakcground32.png',
       href: '/images/favicon-light-gradient-black-bakcground32.png'
     }
   ]
   },
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [

  ],
  authors: [
    {
      name: siteConfig.creator,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.creator,
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,

  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator:siteConfig.twitterHandle ,
  },
  
  manifest: `${siteConfig.url}/site.webmanifest`,
}




















export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head >
          {(metadata.icons as any).icon.map((icon:any, index:number) => (
            <link
              key={index}
              rel="icon"
              href={(icon as any).href}
              media={(icon as any).media}
            />
          ))}
        </head>
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        >

          <Provider>


            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >

              <ThemeSwitcher />
              <div className="relative flex min-h-screen flex-col">
                <div  >
                  <SiteHeader />
                </div>
                <div className="pb-8 flex-1">{children}</div>

                <div  >

                  <Footer />
                </div>
              </div>


            </ThemeProvider>

          </Provider>

        </body>
      </html>
    </>


  );
}
