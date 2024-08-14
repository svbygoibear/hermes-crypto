import React from "react";
import "./AppNameAndLogo.css";
import HermesLogo from "./../../assets/svg/hermes-crypto-logo.svg";
import { CustomIcon } from "./../../components/CustomIcon/CustomIcon";

export const AppNameAndLogo: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <div>
                <CustomIcon svg={HermesLogo} className="logo spin" />
            </div>
            <h1>Hermes-Crypto</h1>
        </React.Fragment>
    );
};
