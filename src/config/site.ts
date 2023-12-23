import { absoluteUrl } from "@/lib/utils"

export const siteConfig = {
    name: "Ask me about my resume",
    url: "https://ex.periment.in",
    ogImage: "/images/favicon-dark-gradient512.jpg",
    creator: "Orlando Calvo",
    creatorShortName: "Orlando",
    twitterHandle:"@calvo_orla33163",
    description:
      "Talk to my chatbot about my resume",
    links: {
      twitter: "https://twitter.com/calvo_orla33163",
      github: "https://github.com/iamorlando/ex.periment.in",
    },
    bot_id:"fd1783dac5254e9b8c4652297269e000",
    pic_width:3888,
    pic_height:2593,
    pic_alt:"Me and my dog",
    pic_url: "/images/profilepic.jpg",

  }
  
  export type SiteConfig = typeof siteConfig