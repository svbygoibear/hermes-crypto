import React, { useState } from "react";
import ReactLogo from "./../../assets/svg/react.svg";
import HermesLogo from "./../../assets/svg/hermes-crypto-logo.svg";
import { CustomIcon } from "./../../components/CustomIcon/CustomIcon";
import "./Home.css";

export interface HomeProps {
    isLoggedIn: boolean;
}

export const Home: React.FunctionComponent<HomeProps> = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="home-wrapper">
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
            <p className="read-the-docs">Click on the HermesCrypto and React logos to learn more</p>
        </div>
    );
};
