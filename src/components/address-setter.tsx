"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { Suspense, use, useEffect } from "react";
import { debounce } from "lodash";
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
import { browserClient as supabase } from "@/lib/supabase-client";
import { useConfig } from "@/hooks/useConfig";
import { on } from "events";
import { revalidatePath } from "next/cache";
import { Skeleton } from "./ui/skeleton";
import { getActiveAddress, getActiveSubscription, updateAddress } from "@/lib/supabase-queries";
// Function to prepend 'http://' if necessary
const urlFriendlyRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\:[0-9]+)?(\/.*)?$/;

const formSchema = z.object({
  miniId: z
    .string()
    .regex(
      urlFriendlyRegex,
      "Invalid URL format. Only URL-friendly strings are allowed."
    )
    .min(
      5
      // "Your mini id needs to have at least 5 characters."
    ),
});

export function MiniIDForm() {
  const [config,setConfig] = useConfig();
  
  useEffect(() => {}, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      miniId: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    supabase.auth.getUser().then(async (resp) => {
      const user = resp.data.user?.id;
      if (!user) return;
      const sub = await getActiveSubscription(supabase,config.activeSubscription)
      const updated = await updateAddress(supabase,{name:miniId},{subscription_id:sub.id},);
      console.log(values);
    });
  }
  const [miniId, setMiniId] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isCheckingDb, setIsCheckingDb] = React.useState(false);
  const [isUnique, setIsUnique] = React.useState(true); // To track if the value is unique in the database
  const debouncedCheckDatabase = React.useCallback(
    debounce(async (miniId: string) => {
      setIsCheckingDb(true);
      const exists = await checkDatabaseForMiniId(miniId);
      setIsUnique(!exists);
      setIsCheckingDb(false);
    }, 500), // 500ms debounce time
    [] // Dependencies array
  );
  // Make sure to clean up the debounced function
  React.useEffect(() => {
    return () => {
      debouncedCheckDatabase.cancel();
    };
  }, [debouncedCheckDatabase]);
  async function checkDatabaseForMiniId(miniId: string) {
    const { data: links, error } = await supabase
      .from("public_links")
      .select("*")
      .eq("name", miniId);
    console.log(miniId);
    console.log(links);
    if (links) {
      return links.length > 0;
    }
    return false;
  }
  React.useEffect(() => {
    if (isValid && miniId) {
      setIsCheckingDb(true);
      // Replace with your actual database check logic
      debouncedCheckDatabase(miniId);
    }
  }, [miniId, isValid, debouncedCheckDatabase]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setMiniId(newValue);

    try {
      formSchema.parse({ miniId: newValue });
      setIsValid(true);
      setErrorMessage("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setIsValid(false);
        // Assuming you want the first error message
        setErrorMessage(error.issues[0].message);
      } else if (error instanceof Error) {
        // Handle generic error
        console.error(error.message);
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center gap-2">
          <FormField
            control={form.control}
            name="miniId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mini ID</FormLabel>
                <FormControl>
                  <Input
                    className="dark:bg-transparent  flex-grow h-[10vh] text-[5vw]  border-b-3"
                    placeholder="your-mini-id"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e); // Update React Hook Form's state
                    }}
                    value={field.value} // Bind field value
                  />
                </FormControl>
                <FormDescription>This is your URL.</FormDescription>
                <FormMessage>{errorMessage}</FormMessage>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2  ">
            <Button
              disabled={isCheckingDb || !isValid || !isUnique}
              className=" h-[5vh] text-[5vw] "
              type="submit"
            >
              Set
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

export default function AddressSetter({ className }: props) {
   const [currentAddress, setCurrentAddress] = React.useState("");

  useEffect(() => {
    async function getAddress() {
      const address = await getActiveAddress(supabase)
      setCurrentAddress(address.name);
      setHasLoaded(true);
    }
    getAddress();
  }, []);
  const [inEditMode, setInEditMode] = React.useState(false);
  const [editMessage, setEditMessage] = React.useState("edit");
  const handleEdit = () => {
    if (inEditMode) {
      setInEditMode(false);
      setEditMessage("edit");
    } else {
      setInEditMode(true);
      setEditMessage("ok");
    }
  };
  const [hasLoaded, setHasLoaded] = React.useState(false);
  return (
    <div className={cn("", className)}>
      <div className="flex flex-row bg-orange-400 items-center">
        <h1 className="  text-[5vw]">{`mi.nimax.me/${
          currentAddress && !inEditMode ? currentAddress : ""
        }`}</h1>
        <div
        // className="mt-2"
        >
          {currentAddress ? (
            <button onClick={handleEdit}>{editMessage}</button>
          ) : !hasLoaded ? (
            <Skeleton className="w-[10vw] h-[15vh]" />
          ) : (
            <MiniIDForm />
          )}
          {inEditMode && <MiniIDForm />}
        </div>
      </div>
    </div>
  );
}
