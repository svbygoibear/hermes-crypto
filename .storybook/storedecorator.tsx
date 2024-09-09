import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../src/store/redux";
import { ThemeProvider } from "../src/contexts/ThemeContext";

const storybookStore = configureStore({
    reducer: rootReducer,
    preloadedState: {
        user: {
            currentUser: null,
            isLoggedIn: false
        },
        app: {
            theme: "light",
            instructionsCollapsed: false
        }
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"]
            }
        })
});

export const StoreDecorator = (Story: React.ComponentType, context: any) => {
    const theme = context.globals.theme === "dark" ? "dark" : "light";
    storybookStore.dispatch({ type: "app/setTheme", payload: theme });

    return (
        <Provider store={storybookStore}>
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        </Provider>
    );
};
