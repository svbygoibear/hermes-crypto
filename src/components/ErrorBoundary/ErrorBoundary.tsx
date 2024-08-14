import React, { ReactNode, createContext, useContext } from "react";
import Modal from "../Modal/Modal";
import { HOME_ROUTE } from "../../routes";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: (resetError: () => void) => ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

const ErrorContext = createContext<Error | null>(null);

// Create a new context for the setError function
const SetErrorContext = createContext<((error: Error) => void) | null>(null);

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
        window.location.pathname = HOME_ROUTE;
    };

    // New method to set error state manually
    setError = (error: Error): void => {
        this.setState({ hasError: true, error });
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContext.Provider value={this.state.error}>
                    <SetErrorContext.Provider value={this.setError}>
                        {this.props.children}
                        <Modal isOpen={this.state.hasError} onClose={this.resetError}>
                            {this.props.fallback(this.resetError)}
                        </Modal>
                    </SetErrorContext.Provider>
                </ErrorContext.Provider>
            );
        }

        return (
            <SetErrorContext.Provider value={this.setError}>
                {this.props.children}
            </SetErrorContext.Provider>
        );
    }
}

const ErrorBoundary: React.FunctionComponent<ErrorBoundaryProps> = ({ children, fallback }) => {
    return <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>;
};

export const useError = (): Error | null => useContext(ErrorContext);

// New hook to access the setError function
export const useSetError = (): ((error: Error) => void) => {
    const setError = useContext(SetErrorContext);
    if (!setError) {
        throw new Error("useSetError must be used within an ErrorBoundary");
    }
    return setError;
};

export default ErrorBoundary;
