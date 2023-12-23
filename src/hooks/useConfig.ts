import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"



type Config = {
  style: string
  theme: string
  radius: number
  explainerBot: string
}

const configAtom = atomWithStorage<Config>("config", {
  style: "default",
  theme: "gradient",
  radius: 0.5,
  explainerBot: "Technical",
})

export function useConfig() {
  return useAtom(configAtom)
}