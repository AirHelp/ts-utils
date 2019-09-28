import * as React from 'react'

interface State {
  hasError: boolean
}

interface Props {
  children: React.ReactNode
  onError: (error: Error, info: string) => void
}

export class ErrorBoundary extends React.Component<Props, State> {
  public static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }

  public state = {
    hasError: false
  }

  public componentDidCatch(error: Error, info: { componentStack: string }) {
    this.props.onError(error, info.componentStack)
  }

  public render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}
