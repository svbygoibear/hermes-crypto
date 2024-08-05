import React from "react";
import { useError } from "../ErrorBoundary/ErrorBoundary";

interface FallbackComponentProps {
    resetError: () => void;
}

export const FallbackComponent: React.FunctionComponent<FallbackComponentProps> = ({
    resetError
}) => {
    const error = useError();

    return (
        <div>
            <p>An error occurred: {error?.message}</p>
            <button onClick={resetError}>Close</button>
        </div>
    );
};
