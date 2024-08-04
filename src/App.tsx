import React, { useState } from "react";
import reactLogo from "./assets/svg/react.svg";
import hermesLogo from "./assets/svg/hermes-crypto-logo.svg";
import "./App.css";
import ErrorBoundary, { useError } from "./components/ErrorBoundary/ErrorBoundary";

const FallbackComponent: React.FC = () => {
    const error = useError();
    return <div>An error occurred: {error?.message}</div>;
};

function App() {
    const [count, setCount] = useState(0);

    return (
        <ErrorBoundary fallback={<FallbackComponent />}>
            <React.Fragment>
                <div>
                    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                        <img src={hermesLogo} className="logo" alt="Hermes Crypto logo" />
                    </a>
                    <a href="https://react.dev" target="_blank" rel="noreferrer">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
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
