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
    miniId: z.string().url(
        // "Sorry, you can only use characters that are allowed in a URL"
        ).min(5, 
            // "Your mini id needs to have at least 5 characters."
            )
})
export function MiniIDForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            miniId: "",
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
                    name="miniId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mini ID</FormLabel>
                            <FormControl>
                                <Input
                                className="dark:bg-transparent max-w-[30vw] flex-grow h-[5vh] text-[5vw]  border-b-3"
                                placeholder="your-mini-id" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your URL.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-2  ">
                <Button  className=" h-[5vh] text-[5vw] " type="submit">Set</Button>
                </div>
                </div>
            </form>
        </Form>
    )
}


interface props {
    className?: string
}
export default async function AddressSetter({ className }: props) {
    return (
        <div
            className={cn(
                ""
                , className)}
        >
            <div className="flex flex-row  bg-orange-400 items-center">
                <h1 className='max-w-[30vw] flex-grow h-[5vh] text-[5vw]'>mi.nimax.me/</h1>
                <div className="mt-2" >
                    <MiniIDForm />
                </div>
            </div>
        </div>
    )
}