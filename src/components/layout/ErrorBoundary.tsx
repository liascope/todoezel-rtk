import { Component } from "react";
import type { ReactNode } from "react"
import type { JSX } from "react"
interface ErrorBoundaryProps {
  children: ReactNode       // alles, was gerendert wird
  fallback?: ReactNode      // optionales Fallback-Element
}

interface ErrorBoundaryState {
  hasError: boolean
}


interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("ErrorBoundary:", error, info)
  }

  render() {
    const { children, fallback } = this.props

    if (this.state.hasError) {
      return (
        fallback ?? (
          <div className="w-full text-center py-10 text-red-400">
            Something went wrong 😕
          </div>
        )
      )
    }

    return children
  }
}

export function ErrorMsg(): JSX.Element {
  return (
    <div className="text-center py-10 text-red-400">
      Oops! Something broke🚨
      <button
        onClick={() => window.location.reload()}
        className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
      >
        Reload Page
      </button>
    </div>
  )
}