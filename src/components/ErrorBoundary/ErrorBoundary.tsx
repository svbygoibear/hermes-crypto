import React, { ReactNode, createContext, useContext } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: (resetError: () => void) => ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

const ErrorContext = createContext<Error | null>(null);

// Classical ErrorBoundary component; it catches errors and provides a fallback UI to display errors in the worst case scenario
// where errors are not caught by the component that threw them.
class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError = (error: Error): ErrorBoundaryState => {
        return { hasError: true, error };
    };

    componentDidCatch = (error: Error, errorInfo: React.ErrorInfo): void => {
        console.error("Uncaught error:", error, errorInfo);
    };

    resetError = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContext.Provider value={this.state.error}>
                    {this.props.fallback(this.resetError)}
                </ErrorContext.Provider>
            );
        }

        return this.props.children;
    }
}

const ErrorBoundary: React.FunctionComponent<ErrorBoundaryProps> = ({ children, fallback }) => {
    return <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>;
};

export const useError = (): Error | null => useContext(ErrorContext);

// Global error handler; it catches errors and provides a fallback UI (as specified) to display errors in the worst case scenario
export default ErrorBoundary;
