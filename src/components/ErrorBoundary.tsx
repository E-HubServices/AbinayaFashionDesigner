import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.fallback) return this.fallback;

            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-surface rounded-[2rem] border border-accent/10 shadow-sm m-4">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-2xl font-serif text-primary-dark mb-4">Something went wrong</h2>
                    <p className="text-foreground-muted mb-8 max-w-sm mx-auto">
                        We encountered an unexpected error. Please try refreshing the collection.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-8 py-3 bg-primary-dark text-white rounded-xl hover:shadow-lg transition-all font-bold uppercase tracking-widest text-xs"
                    >
                        <RefreshCw size={16} />
                        Refresh Page
                    </button>

                    {import.meta.env.DEV && (
                        <pre className="mt-8 p-4 bg-slate-50 rounded-lg text-left text-[10px] text-red-400 overflow-auto max-w-full font-mono">
                            {this.state.error?.toString()}
                        </pre>
                    )}
                </div>
            );
        }

        return this.children;
    }

    private get children() {
        return this.props.children;
    }

    private get fallback() {
        return this.props.fallback;
    }
}

export default ErrorBoundary;
