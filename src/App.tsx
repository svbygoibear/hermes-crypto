import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { Home } from "./views/Home/Home";
import { LayoutBox } from "./layouts/LayoutBox/LayoutBox";
import { GenericError } from "./views/GenericError/GenericError";
import { HOME_ROUTE } from "./routes";
import { useSetError } from "./components/ErrorBoundary/ErrorBoundary";

export const App: React.FunctionComponent = () => {
    const setError = useSetError();
    // Global error handling for unhandled promise rejections
    React.useEffect(() => {
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            event.preventDefault();
            setError(event.reason);
        };
        window.addEventListener("unhandledrejection", handleUnhandledRejection);
        return () => {
            window.removeEventListener("unhandledrejection", handleUnhandledRejection);
        };
    }, [setError]);

    // TODO: check if logged in here - check redux

    const router = createBrowserRouter([
        {
            path: HOME_ROUTE,
            element: <Home isLoggedIn={false} />,
            errorElement: <GenericError />
        }
    ]);

    return (
        <React.Fragment>
            <LayoutBox>
                <AppHeader isLoggedIn={false} />
                <RouterProvider router={router} />
            </LayoutBox>
        </React.Fragment>
    );
};
