import { ReactNode } from "react"

interface props {
  children: ReactNode
}
export default function Layout(
  props: props
) {
  return (
    <div className="flex flex-grow">
      {props.children}
    </div>
  )
}
