import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"



type Config = {
  style: string
  theme: string
  radius: number
  explainerBot: string
  activeSubscription:string|undefined
}

const configAtom = atomWithStorage<Config>("config", {
  style: "default",
  theme: "gradient",
  radius: 0.5,
  explainerBot: "Technical",
  activeSubscription:undefined,
})

export function useConfig() {
  return useAtom(configAtom)
}