"use client"

import { ChatWithInput } from "@/components/ChatWithInput"
import { QueryClientProvider, QueryClient } from "react-query"



interface ClientChatProps {
botId: string;
botName: string;

}

export default function ClientChat({botId,botName}: ClientChatProps) {

    const queryClient = new QueryClient()
    return (

        <QueryClientProvider client={queryClient}>
            <ChatWithInput botId={botId} botName={botName}/>
        </QueryClientProvider>


    )
}
