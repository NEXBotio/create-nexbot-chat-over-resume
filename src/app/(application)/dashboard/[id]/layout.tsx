import { createSupaServerClient } from "@/lib/supabase-server";
import { ReactNode } from "react";

export async function generateStaticParams() {
  const supabase = await createSupaServerClient();
  const user = await supabase.auth.getUser();
  return {
    params: {
      id: user?.data.user?.id,
    },
  };
}

export default async function Layout({
  address,
  children,
}: {
  address: ReactNode;
  children: ReactNode;
}) {
  {
    return (
      <div className="">
        {address}
        {children}
      </div>
    );
  }
}
