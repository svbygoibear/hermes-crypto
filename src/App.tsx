import React from "react";
import "./App.css";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { Home } from "./views/Home/Home";
import { LayoutBox } from "./layouts/LayoutBox/LayoutBox";
// import {
//     createBrowserRouter,
//     RouterProvider,
//   } from "react-router-dom";

function App() {
    return (
        <React.Fragment>
            <LayoutBox>
                <AppHeader isLoggedIn={false} />
                <Home isLoggedIn={false} />
            </LayoutBox>
        </React.Fragment>
    );
}

export default App;
