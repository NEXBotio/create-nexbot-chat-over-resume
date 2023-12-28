import { useConfig } from "@/hooks/useConfig";
import { createSupaServerClient } from "@/lib/supabase-server";

type SupaBasePromise = ReturnType<typeof createSupaServerClient>;
type SupaBase = Awaited<SupaBasePromise>;

export async function getNullSubscription(client: SupaBase) {
  console.log("no subscription found");
  // Find the first subscription where 'expiresat' is null
  const { data: subscriptionData, error: subscriptionError } = await client
    .from("subscriptions")
    .select("*")
    .is("expiresat", "NULL")
    .single(); // maybeSingle returns either one record or null
  console.log(subscriptionData);

  if (subscriptionError) {
    console.error("Error fetching subscription:", subscriptionError);
    return;
  }
  return subscriptionData;
}

export const getSubscriptionByID = async (client: SupaBase, id: string) => {
  console.log("subscription found");
  // Fetch subscription by ID
  const { data: subscriptionData, error: subscriptionError } = await client
    .from("subscriptions")
    .select("*")
    .eq("id", id)
    .single(); // single returns one record and throws an error if none or more than one record is found

  if (subscriptionError) {
    console.error("Error fetching subscription:", subscriptionError);
    return;
  }

  return subscriptionData;
};

export async function getActiveSubscription(
  client: SupaBase,
  activeSubscription: string
) {
  if (typeof activeSubscription === "undefined") {
    return await getNullSubscription(client);
  } else {
    return await getSubscriptionByID(client, activeSubscription);
  }
}
export async function getAddressBySubscription(
  client: SupaBase,
  subscription: string
) {
  const { data: address, error: addressError } = await client
    .from("addresses")
    .select("*")
    .eq("subscription_id", subscription)
    .single();

  if (addressError) {
    console.error("Error fetching address:", addressError);
    return;
  }

  return address;
}

export async function getActiveAddress(client: SupaBase) {
  const sub = await getActiveSubscription(client);
  return await getAddressBySubscription(client, sub.id);
}

export async function updateAddress(
  client: SupaBase,
  update: { [key:string]: string},
  searchBy:{ [key:string]: string},

  
) {
  const { data: updateAddrs, error: updateAddrsError } = await client
    .from("addresses")
    .update(update)
    .match(searchBy);

  if (updateAddrsError) {
    console.error("Error fetching address:", updateAddrsError);
    return;
  }

  return updateAddrs;
}

