"use server"
export const fetchSingleUseChatToken = async () => {
    "use server"

    const resp = await fetch("https://apis.nexbot.io/web/v1/secrets/generate_single_use_token", {
        method: "GET",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoic2VydmVyX3NlY3JldCIsImlhdCI6MTcwMTQ0NDc1OCwic3ViIjoiamdiVU9NbEE5ek84MWx3UnZYcjd2aE5DZ3VkMiIsInZlcnNpb24iOjZ9.a1OtDzSDqTjyO5lCX0zO2kKspLbJCNEvBoMYgmLukVI",
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    })
    const data = await resp.json();
    return data.access_token
}