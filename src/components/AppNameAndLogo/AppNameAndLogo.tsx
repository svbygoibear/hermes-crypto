import React from "react";
import "./AppNameAndLogo.css";
import HermesLogo from "./../../assets/svg/hermes-crypto-logo.svg";
import { CustomIcon } from "./../../components/CustomIcon/CustomIcon";

export const AppNameAndLogo: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <div className="app-name-and-logo-wrapper">
                <CustomIcon svg={HermesLogo} className="logo spin" />
                <span className="app-name-and-log-text">Hermes-Crypto</span>
            </div>      
        </React.Fragment>
    );
};
