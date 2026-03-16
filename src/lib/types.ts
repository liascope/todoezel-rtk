import type { ReactNode } from "react" 

// layout
export type ErrorBoundaryProps = {
  children: ReactNode       
  fallback?: ReactNode     
}

export type ErrorBoundaryState = {
  hasError: boolean
}

// ui
export type IconProps = {
    className?: string,
    toggle?: boolean,
    maxReached?:boolean
}

export type SpinnerProps = { size?:string} 

export type ModalProps = {onClose: ()=> void}

export type UIbutton= {
  children: ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  disabledOnDefault: boolean,
  customStyle?: string,
  type?: "button" | "submit" | "reset" | undefined,
}

export type ButtonQueryProps = {
  tasks: Todo[]
  setTasks: (tasks: Todo[] | ((prev: Todo[]) => Todo[])) => void
  placeholder: string
}

export type ConfirmProps = {
clickYes:()=>void,
clickNo:()=>void}

export type PercentProps = {
  arr: Todo[]
}
export type ToggleListProps = {
  tasks: Todo[]
  onDelete?: (id: string, task: Todo) => void
  onToggle?: (id: string, task: Todo) => void
  toggle?: boolean
  maxHeight?: string
}

// pages
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

export type DoLaterState = {
  allSavedTasks: DoLaterEntry[]
  savedDate: string
}