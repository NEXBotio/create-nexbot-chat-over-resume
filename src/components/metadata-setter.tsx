"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getActiveAddress, updateAddress } from "@/lib/supabase-queries";
import { browserClient as supabase } from "@/lib/supabase-client";
import { get, set } from "lodash";
import { Skeleton } from "./ui/skeleton";
const formSchema = z.object({
  description: z.string(),
  title: z.string(),
});

export function MetadataForm() {
  const [titleDisabled, setTitleDisabled] = React.useState<boolean>(false);
  const [descriptionDisabled, setDescriptionDisabled] =
    React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [isTitleLoading, setIsTitleLoading] = React.useState<boolean>(false);
  const [isDescriptionLoading, setIsDescriptionLoading] =
    React.useState<boolean>(false);

  useEffect(() => {
    const getInitialValues = async () => {
      setIsTitleLoading(true);
      setIsDescriptionLoading(true);

      const address = await getActiveAddress(supabase);
      setTitle(address.og_title);
      setDescription(address.og_description);
      setIsTitleLoading(false);
      setIsDescriptionLoading(false);
    };
    getInitialValues();
  }, []);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(
    'in onSubmit'
    );
    setTitleDisabled(true);
    setDescriptionDisabled(true);

    const activeAddress = await getActiveAddress(supabase);
    console.log(activeAddress);
    const updatedTitle = await updateAddress(
      supabase,
      { og_title: values.title },
      { id: activeAddress.id }
    );
    setTitleDisabled(false);
    const updatedDes = await updateAddress(
      supabase,
      { og_description: values.description },
      { id: activeAddress.id }
    );

    setDescriptionDisabled(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent max-w-[30vw] flex-grow h-[5vh] text-[3vw]  text-primary-foreground border-b-3"
                    placeholder="card title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your URL.</FormDescription>
                <FormMessage></FormMessage>
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
                    placeholder="card description"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage></FormMessage>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2  ">
            <Button
              className=" h-[5vh] text-[5vw] "
              type="submit"
            >
              change
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

interface props {
  className?: string;
}
export default function MetaDataSetter({ className }: props) {
  return (
    <div className={cn("", className)}>
      <div
        className="\

            flex flex-row  \
            bg-orange-400 items-center"
      >
        <h2
          className="\
                max-w-[30vw] \
                flex-grow \
                h-[5vh] text-[3vw]"
        >
          Title
        </h2>
        <div
        // className="mt-2"
        >
          <MetadataForm />
        </div>
      </div>
    </div>
  );
}
