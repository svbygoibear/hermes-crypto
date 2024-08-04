import * as React from "react";
import HermesLogoIcon from "./svg/hermes-crypto-logo.svg";
import SvgIcon from "@mui/material/SvgIcon/SvgIcon";

export const AppLogoIcon: React.FunctionComponent = () => {
    return (
        <SvgIcon sx={{ paddingRight: 1 }}>
            <HermesLogoIcon />
        </SvgIcon>
    );
};
