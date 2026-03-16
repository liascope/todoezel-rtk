import type { ReactNode } from "react"

export type IconProps = {
    className?: string,
    toggle?: boolean,
    maxReached?:boolean
}

export type UIbutton= {
children: ReactNode,
onClick?: React.MouseEventHandler<HTMLButtonElement>,
disabledOnDefault: boolean,
customStyle?: string,
type?: "button" | "submit" | "reset" | undefined,
}

export type SpinnerProps = { size?:string} 

export type ModalProps = {onClose: ()=> void}

export type TodoShopProps = {type: string}

export type Todo = {
  id: string
  task: string
  done: boolean
  delete?: boolean
}

export type DoLaterEntry = {
  tasks: Todo[]
  date:string
}