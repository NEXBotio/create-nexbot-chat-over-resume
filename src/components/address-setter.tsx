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
  const config = useConfig();
  async function writeToAddressTable() {
    let subscription;
    console.log(config.activeSubscription);

    if (config.activeSubscription === undefined) {
      console.log("no subscription found");
      // Find the first subscription where 'expiresat' is null
      const { data: subscriptionData, error: subscriptionError } =
        await supabase
          .from("subscriptions")
          .select("*")
          .is("expiresat", "NULL")
          .maybeSingle(); // maybeSingle returns either one record or null
      console.log(subscriptionData);

      if (subscriptionError) {
        console.error("Error fetching subscription:", subscriptionError);
        return;
      }

      subscription = subscriptionData;
    } else {
      console.log("subscription found");
      // Fetch subscription by ID
      const { data: subscriptionData, error: subscriptionError } =
        await supabase
          .from("subscriptions")
          .select("*")
          .eq("id", config.activeSubscription)
          .single(); // single returns one record and throws an error if none or more than one record is found

      if (subscriptionError) {
        console.error("Error fetching subscription:", subscriptionError);
        return;
      }

      subscription = subscriptionData.id;
      console.log(subscription);
      console.log(config.activeSubscription);
    }

    if (!subscription) {
      console.log("No subscription found");
      return;
    }

    const { data: updateAddrs, error: updateAddrsError } = await supabase
      .from("addresses")
      .update({ name: miniId })
      .match({ subscription_id: subscription.id });
    config.activeSubscription = subscription.id;

    if (updateAddrsError) {
      console.error("Error fetching address:", updateAddrsError);
      return;
    }

    //need to remove input, replace with string url, add edit button
  }
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
      await writeToAddressTable();
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
  const config = useConfig();
  async function getCurrentAddress() {
    console.log("getting address");
    if (typeof config.activeSubscription === "string") {
      console.log("sub is string");
      // Case 1: activeSubscription is a string
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("subscription_id", config.activeSubscription)
        .single();

      if (error) throw error;
      return data.name;
    } else if (typeof config.activeSubscription === "undefined") {
      console.log("sub is undefined");
      console.log("no subscription found");
      // Case 2: activeSubscription is undefined
      const { data: subscriptionData, error: subscriptionError } =
        await supabase
          .from("subscriptions")
          .select("id")
          .is("expiresat", null)
          .single();

      if (subscriptionError) throw subscriptionError;
      if (!subscriptionData) return null;

      const { data: addressData, error: addressError } = await supabase
        .from("addresses")
        .select("*")
        .eq("subscription_id", subscriptionData.id)
        .single();

      if (addressError) throw addressError;
      return addressData.name;
    }
    return "";
  }

  const [currentAddress, setCurrentAddress] = React.useState("");
  useEffect(() => {
    async function getAddress() {
      const address = await getCurrentAddress();
      setCurrentAddress(address);
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
