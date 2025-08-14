import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error }>;
}

const DefaultErrorFallback = ({ error }: { error?: Error }) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-card rounded-lg p-6 border border-border text-center">
      <div className="text-destructive text-xl mb-4">⚠️</div>
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Ops! Algo deu errado
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Ocorreu um erro inesperado. Por favor, recarregue a página.
      </p>
      {import.meta.env.DEV && error && (
        <details className="text-xs text-left bg-secondary p-2 rounded mt-4">
          <summary className="cursor-pointer text-secondary-foreground">
            Detalhes do erro
          </summary>
          <pre className="mt-2 text-destructive whitespace-pre-wrap">
            {error.message}
            {error.stack}
          </pre>
        </details>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
      >
        Recarregar Página
      </button>
    </div>
  </div>
);

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to external service in production
    if (import.meta.env.PROD) {
      // You could send this to an error tracking service like Sentry
      console.error('Production error:', { error, errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;