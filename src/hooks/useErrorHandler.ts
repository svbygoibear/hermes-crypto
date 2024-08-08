import { useState, useCallback } from "react";

type ErrorState = Error | null;

const useErrorHandler = (initialState: ErrorState = null) => {
    const [error, setError] = useState<ErrorState>(initialState);

    const handleError = useCallback((err: Error) => {
        console.error(err);
        setError(err);
    }, []);

    return [error, handleError] as const;
};

export default useErrorHandler;
