"use server"
import MarkdownLatex from "@/components/MarkdownLatex"
import ClientChat from "@/components/ClientChat"
import {bio} from '@/content/docs/orlando_about'
import Image from "next/image"
import { Suspense } from "react"
import AnimationWrapper from "@/components/AnimationWrapper"
import { siteConfig } from "@/config/site"


function getAuthorInfo(): { name: string, shortName: string,bio: { body: string }, pic: { url: string, description: string, title: string, width: number, height: number }, bot: string }{
return {
        name: siteConfig.creator,
        shortName: siteConfig.creatorShortName,
        bio: {
          body: bio
        },
        pic: {
          url: siteConfig.pic_url,
          title: siteConfig.pic_alt,
          description: siteConfig.pic_alt,
          width: siteConfig.pic_width,
          height: siteConfig.pic_height
      
        },
        bot: siteConfig.bot_id,
      }
}

export default async function page({ params }: { params: { author: string } }) {
    const author = getAuthorInfo()

    return (
        <AnimationWrapper duration={0.5}>
        <div className="flex">
            <main className="  overflow-auto max-h-[90vh] fixed pr-10 pl-10 top-0 pt-16 md:top-0 ml-4 md:pt-4 mt-4 left-0 w-[full] md:w-[60vw] flex-grow">
                {/* <AspectRatio ratio={16/9}> */}

                <div className="pb-10 ">
                    <Image className="rounded-xl" alt={author.pic.description} src={author.pic.url} width={author.pic.width} height={author.pic.height}
                    />
                </div>
                {/* </AspectRatio> */}
                <div>
                    <MarkdownLatex>{author.bio.body}</MarkdownLatex>
                </div>

            </main>
            {/* <div className="bg-black"> */}
            <aside className=" bg-slate-700 top-0 hidden md:block fixed  right-0  w-[40vw] h-full ">
                <div className="flex  xs:hidden flex-col justify-center items-center">
                    <Suspense fallback={<p>LOADING</p>}>
                        <ClientChat botId={author.bot} botName={author.shortName}/>
                    </Suspense>
                </div>
            </aside>
            {/* </div> */}
        </div>
        </AnimationWrapper>
    )
}
