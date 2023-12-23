"use server"
import { cookies } from "next/headers"
import { v4 } from "uuid"
export async function getConv(botId:string,botName:string){
    "use server"
    const cookieStore = cookies()
let conv:string|undefined
if (!cookieStore.has(`conv-${botId}-${botName}`)){
    conv = v4()
    cookieStore.set(`conv-${botId}-${botName}`,conv )
}
else{
    conv = cookieStore.get(`conv-${botId}-${botName}`)?.value
}
return conv
}
