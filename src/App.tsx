import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { Home } from "./views/Home/Home";
import { LayoutBox } from "./layouts/LayoutBox/LayoutBox";
import { GenericError } from "./views/GenericError/GenericError";

export const App: React.FunctionComponent = () => {
    const router = createBrowserRouter([
        {
            path: "/home",
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
