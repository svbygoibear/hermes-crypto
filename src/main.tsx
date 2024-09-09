import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./App";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/inter";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { FallbackComponent } from "./components/FallbackComponent/FallbackComponent";
import { store, persistor } from "./store/redux";
import { ThemeProvider } from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

(() => {
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider>
                    <PersistGate loading={null} persistor={persistor}>
                        <ErrorBoundary
                            fallback={resetError => <FallbackComponent resetError={resetError} />}>
                            <App />
                        </ErrorBoundary>
                    </PersistGate>
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    );
})();
