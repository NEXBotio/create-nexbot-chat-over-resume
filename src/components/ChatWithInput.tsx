
import * as React from "react"
import { SendIcon, Loader2 } from "lucide-react"

import { getConv } from "@/functions/cookies";
import { useChatStream } from "react-nexbot";
import MarkdownLatexDynamicClient from '@/components/MarkdownLatexDynamicClient';
import { fetchSingleUseChatToken } from '@/server_actions/nexbot'
import { cn } from "@/lib/utils"



import { Button } from "@/components/ui/button"
import { concatMap, of, delay, timeout as obsTimeout } from "rxjs";
import AnimationWrapper from "./AnimationWrapper";




interface ChatCardProps {
    botId: string
    botName: string

}

export function ChatWithInput({ botId, botName }: ChatCardProps) {
    const [conversationId, setConversationId] = React.useState<string | undefined>()

    const { sendMessage } = useChatStream(fetchSingleUseChatToken, botId, "Reader", "Bot");
    const [willStream, setWillStream] = React.useState(false);
    const [isResponseLoading, setIsResponseLoading] = React.useState(false);
    const [outgoingMessage, setOutgoingMessage] = React.useState<string>("");
    const [messageToSend, setMessageToSend] = React.useState<string>("");
    const [willBeReceiving, setWillBeReceiving] = React.useState<number|undefined>();
    const [getControlBackSpinner, setGetControlBackSpinner] = React.useState(false);
    React.useEffect(() => {
        const fetchConversationId = async () => {
            const id = await getConv(botId, botName);
            setConversationId(id);
            console.log(id)
        };

        fetchConversationId();
    }, [botId, botName]);
    type Message = {
        content: string
        role: "user" | "ai"
        timestamp: number
    }

    const [messages, setMessages] = React.useState<Message[]>([])

    const onClick = () => {
        console.log('in click')
        if (outgoingMessage === "" || isResponseLoading || willStream) {
            return
        }
        setIsResponseLoading(true);
        // console.log("clicked");

        const outgoing: Message = {
            content: outgoingMessage,
            role: "user",
            timestamp: Date.now()
        }

        setMessageToSend(outgoingMessage);
        setMessages(prev => [...prev, outgoing])
        setOutgoingMessage("");
        setTimeout(() => {
        setWillStream(true);
        
       
        }, 1000);


        

    }




    React.useEffect(() => {
        console.log('in effect')

        if (willStream && messageToSend !== "") {
            setWillStream(false);
            console.log('in will stream')
            console.log('new observable')

            const newObservable = sendMessage(messageToSend, conversationId);

            if (newObservable) {
                console.log('in new observable')
                const timestamp = Date.now();
                let message: Message = {
                    content: "",
                    role: "ai",
                    timestamp: timestamp
                }
                setWillBeReceiving(timestamp);
                setMessages(prev => [...prev, message])
                console.log('in new observable')
                newObservable

                    .pipe(
                        concatMap((item) => of(item).pipe(delay(10))),
                        // obsTimeout({
                        //     first: 15000,
                        //     with: () => of({ stream: "server has timedout, please try again.", sources: [] }), // Replace with your fallback logic
                        // })
                    )
                    .subscribe({
                        next: (data) => {
                            setWillBeReceiving(undefined);
                            console.log(data.stream);
                            setMessages(prev => {
                                // Check if there are any messages
                                if (prev.length > 0) {
                                    // Clone the existing messages array
                                    const newMessages = [...prev];

                                    // Update the last message
                                    const lastMessageIndex = newMessages.length - 1;
                                    newMessages[lastMessageIndex] = {
                                        ...newMessages[lastMessageIndex],
                                        content: newMessages[lastMessageIndex].content + data.stream // Append the new content
                                    };

                                    return newMessages;
                                }
                                return prev;
                            });
                        },
                        complete: () => {
                            console.log("complete");
                            setGetControlBackSpinner(true);

                            setWillStream(false);
                            setMessageToSend("");
                            setTimeout(() => {
                                setGetControlBackSpinner(false);
                                setIsResponseLoading(false);    
                                
                            },5000)
                        },
                        error: (error) => {
                            console.log(error);
                            setIsResponseLoading(false);
                            setWillStream(false);
                            setMessageToSend("");
                            setOutgoingMessage("");
                        },
                    });
            }
        }

    }, [willStream,conversationId,messageToSend, sendMessage, outgoingMessage]);
    const [text, setText] = React.useState("");

    React.useEffect(() => { console.log(text) }, [text])

    const [input, setInput] = React.useState("")

    const inputLength = input.trim().length
    // React.useEffect(() => {
    //     // Reset the state whenever the 'text' or 'renderInMarkdown' changes
    //     setIsMarkdownRendered(false);
    // }, [text, renderInMarkdown]);

    const [newlineCount, setNewlineCount] = React.useState(0);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        console.log('in event');
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                // Insert new line
                setNewlineCount((prev) => prev + 1);
            } else {
                // Send message when Enter is pressed without the Shift key
                onClick(); // Assuming onClick is the function to send the message
            }
            event.preventDefault();
        }
    };
    const chatContainerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (chatContainerRef.current) {
            const { scrollHeight } = chatContainerRef.current;
            chatContainerRef.current.scrollTop = scrollHeight;
        }
    }, [messages]); // Dependency on 'messages' ensures this runs every time the messages change

    return (

        <ul className="flex h-[calc(100vh-8rem)] w-full lg:h-[100vh] overflow-auto ">
            <li className="flex-grow  overflow-auto">
                <div ref={chatContainerRef} className="space-y-10 pb-10  max-h-[calc(100vh-100px)]  p-4  overflow-auto  ">

                    {messages.map((message, index) => (


                      <div 
                      key={index*1.5}
                      className="flex  flex-row mt-[calc(100vh-100px)]   gap-2 rounded-lg px-3 py-4 ">
                        <AnimationWrapper direction={'up'}>
                        {willBeReceiving===message.timestamp?(<div className="bg-primary/80 ml-auto  rounded-lg px-3 py-4 text-primary-foreground"><Loader2 className="  animate-spin" /></div>):
                        (<div
                            key={index}
                            className={cn(
                                "text-lg opacity-1 transition-opacity duration-500 ease-in    rounded-lg px-3 py-4  ",
                                message.role === "user"
                                    ? "ml-auto bg-slate-900 text-slate-100"
                                    : " bg-primary/80 text-primary-foreground"
                            )}
                        >
                            {/* {renderInMarkdown?( */}
                            {/* // <div className="opacity-1 transition-opacity duration-500 ease-in"><MarkdownLatexDynamicClient onRendered={onHandleRendered} > */}
                            <div className="opacity-1 transition-opacity duration-500 ease-in"><MarkdownLatexDynamicClient >
                            
                        
                                {message.content}
                        
                            </MarkdownLatexDynamicClient>
                            </div>
                            {/* </div>):(text)} */}
                        </div>)}
                        </AnimationWrapper>
                        
                        </div>

                        
                    ))}
                </div>


            </li>
            <li>
                <div className="  border-t-[1px] rounded-t-xl  border-t-slate-500 flex-grow border-t-1 bottom-0 overflow-auto left-0 bg-slate-800 min-h-[100px] w-full max-h-[500px] absolute" >
                    <div className="absolute bottom-[50%]  translate-y-[50%] right-0 ">
                        <Button className="bg-slate-70 hover:bg-primary/10 text-primary" disabled={isResponseLoading} onClick={onClick} type="submit" >
                         
                            <span className="text-lg   h-[25px] w-[25px] right-0">
                                {getControlBackSpinner?(<Loader2 className="  animate-spin" />):(<SendIcon />)  }
                                </span>
                        </Button>
                    </div>

                    <textarea
                        disabled={isResponseLoading}
                        id="message"
                        placeholder="Type your message..."
                        className=" flex-grow pl-4 pt-4 caret-slate-200  bg-inherit pr-2 overflow-auto focus-visible:ring-0 focus-visible:outline-none  border-0 left-0 text-lg w-full text-slate-100"
                        autoComplete="off"


                        onKeyDown={(event) => handleKeyDown(event)}
                        value={outgoingMessage}
                        onChange={(event) => setOutgoingMessage(event.target.value)}
                        style={
                            {
                                resize: 'none', overflowY: 'auto',
                                height: ((outgoingMessage.split('\n').length + newlineCount) * 1.5) + 'rem',
                                maxHeight: '15rem', minHeight: '2.8rem',
                                fontSize: '1.4rem'
                            }}
                    /></div></li>
            {/* <button id="send-button" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button> */}
        </ul>
    )
}                      
