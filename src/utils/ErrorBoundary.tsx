import React, { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className='container'>
          <h1>Something went wrong ☹️</h1>
          <a href='/'>Go back home</a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
