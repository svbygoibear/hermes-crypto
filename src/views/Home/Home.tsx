/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import HermesLogo from "./../../assets/svg/hermes-crypto-logo.svg";
import { CustomIcon } from "./../../components/CustomIcon/CustomIcon";
import "./Home.css";
import { Countdown } from "../../components/CountdownTimer/CountdownTimer";

export interface HomeProps {
    isLoggedIn: boolean;
}

export const Home: React.FunctionComponent<HomeProps> = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="home-wrapper">
            <div>
                <CustomIcon svg={HermesLogo} className="logo spin" />
            </div>
            <h1>Hermes-Crypto</h1>
            <h2>Welcome back, [your-name-here]</h2>
            <div className="card">
                <Countdown />
                {/* <button onClick={() => setCount(count => count + 1)}>count is {count}</button> */}
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the HermesCrypto and React logos to learn more</p>
        </div>
    );
};
