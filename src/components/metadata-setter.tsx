"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const formSchema = z.object({
    description:z.string(),
    title: z.string().url(
        // "Sorry, you can only use characters that are allowed in a URL"
        ).min(5, 
            // "Your mini id needs to have at least 5 characters."
            )
})

export function MetadataForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description:""
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="flex flex-row items-center gap-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                className="bg-transparent max-w-[30vw] flex-grow h-[5vh] text-[3vw]  border-b-3"
                                placeholder="e.g. Your Name" {...field} />
                            </FormControl>
                            <FormDescription>
                            Heading of your social media preview
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        
                    )}
                />
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                className="bg-transparent max-w-[30vw] flex-grow h-[5vh] text-[3vw]  text-primary-foreground border-b-3"
                                placeholder="e.g. Something about yourself" {...field} />
                            </FormControl>
                            <FormDescription>
                            Description for your social media preview
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        
                    )}
                />
                <div className="mt-2  ">
                <Button  className=" h-[5vh] text-[3vw] " type="submit">Set</Button>
                </div>
                </div>
            </form>
        </Form>
    )
}


interface props {
    className?: string
}
export default  function MetaDataSetter({ className }: props) {
    return (
        <div
            className={cn(
                ""
                , className)}
        >
            <div className="\

            flex flex-row  \
            bg-orange-400 items-center">
                <h2 
                className= '\
                max-w-[30vw] \
                flex-grow \
                h-[5vh] text-[3vw]'
                >Title</h2>
                <div 
                // className="mt-2" 
                >
                    <MetadataForm />
                </div>
            </div>
        </div>
    )
}