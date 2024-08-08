import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/inter";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { FallbackComponent } from "./components/FallbackComponent/FallbackComponent";

const root = ReactDOM.createRoot(document.getElementById("root")!);

(() => {
    root.render(
        <React.StrictMode>
            <ErrorBoundary fallback={resetError => <FallbackComponent resetError={resetError} />}>
                <App />
            </ErrorBoundary>
        </React.StrictMode>
    );
})();
