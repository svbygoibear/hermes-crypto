import React from "react";
import { useError } from "../ErrorBoundary/ErrorBoundary";
import { GlobalErrorAlert } from "../GlobalErrorAlert/GlobalErrorAlert";

interface FallbackComponentProps {
    resetError: () => void;
}

export const FallbackComponent: React.FunctionComponent<FallbackComponentProps> = ({
    resetError
}) => {
    const error = useError();

    return (
        <React.Fragment>
            <GlobalErrorAlert
                title="An error occurred"
                message={error?.message ?? "The gremlins are at it again! Please try again."}
                onClose={resetError}
            />
        </React.Fragment>
    );
};
