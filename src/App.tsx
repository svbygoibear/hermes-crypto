import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { Home } from "./views/Home/Home";
import { LayoutBox } from "./layouts/LayoutBox/LayoutBox";
import { GenericError } from "./views/GenericError/GenericError";
import { HOME_ROUTE } from "./routes";
import { useSetError } from "./components/ErrorBoundary/ErrorBoundary";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { clearUser, setLoggedOut } from "./store/userSlice";

export const App: React.FunctionComponent = () => {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

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

    // Check if user is logged in
    const isUserLoggedIn = user !== null && user?.currentUser !== null && user.isLoggedIn;

    const handleLogout = (): void => {
        dispatch(clearUser());
        dispatch(setLoggedOut());
    };

    // Define the routes
    const router = createBrowserRouter([
        {
            path: HOME_ROUTE,
            element: <Home />,
            errorElement: <GenericError />
        }
    ]);

    return (
        <React.Fragment>
            <LayoutBox>
                <AppHeader
                    userName={user?.currentUser?.name ?? ""}
                    isLoggedIn={isUserLoggedIn}
                    onLogout={handleLogout}
                />
                <RouterProvider router={router} />
            </LayoutBox>
        </React.Fragment>
    );
};
