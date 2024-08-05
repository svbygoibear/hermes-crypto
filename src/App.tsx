import React, { useState } from "react";
import ReactLogo from "./assets/svg/react.svg";
import HermesLogo from "./assets/svg/hermes-crypto-logo.svg";
import "./App.css";
import ErrorBoundary, { useError } from "./components/ErrorBoundary/ErrorBoundary";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { CustomIcon } from "./components/CustomIcon/CustomIcon";

const FallbackComponent: React.FC = () => {
    const error = useError();
    return <div>An error occurred: {error?.message}</div>;
};

function App() {
    const [count, setCount] = useState(0);

    return (
        <ErrorBoundary fallback={<FallbackComponent />}>
            <React.Fragment>
                <AppHeader isLoggedIn={false} />
                <div>
                    <CustomIcon svg={HermesLogo} className="logo" />
                    <CustomIcon svg={ReactLogo} className="logo react spin" />
                </div>
                <h1>HermesCrypto + React</h1>
                <div className="card">
                    <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            </React.Fragment>
        </ErrorBoundary>
    );
}

export default App;
