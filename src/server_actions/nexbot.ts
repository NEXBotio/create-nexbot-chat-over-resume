"use server"
export const fetchSingleUseChatToken = async () => {
    "use server"

    const resp = await fetch("https://apis.nexbot.io/web/v1/secrets/generate_single_use_token", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.NEXBOT_SECRET}`,
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    })
    const data = await resp.json();
    return data.access_token
}