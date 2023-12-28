
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Link, LogOut } from "lucide-react";
import { createSupaServerClient } from "@/lib/supabase-server";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogoutButton } from "./logout-button";
import React, { Suspense } from "react";

export async function AvatarMenuButton() {
  const supabase = await createSupaServerClient();
  const userResp = await supabase.auth.getUser();
  console.log("USER", userResp.data.user?.user_metadata);

  const fallbackName = userResp.data.user?.user_metadata?.full_name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("");
    return (
      <Suspense fallback={<Skeleton className="w-8 h-8" />}>
      <Avatar>
        <AvatarImage
          className="rounded-none"
          src={userResp.data.user?.user_metadata.picture}
          alt={userResp.data.user?.user_metadata.user_name}
        />
        <AvatarFallback>{<Skeleton > {fallbackName}</Skeleton>}</AvatarFallback>
      </Avatar>
      </Suspense>
    );
}
export async function ProfileMenu() {
  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger>
          <AvatarMenuButton />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              {" "}
              <Link className="mr-2 h-4 w-4" />
              <span>Links</span>
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Check />
                <span> Email link</span>
              </MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>New Link</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <LogoutButton />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
