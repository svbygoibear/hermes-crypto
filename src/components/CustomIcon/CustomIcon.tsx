import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";

const StyledSvgIcon = styled(SvgIcon)(({ theme }) => ({
    width: 60,
    height: 60,
    marginRight: theme.spacing(0),
    "&.spin": {
        animation: "logo-spin infinite 20s linear"
    }
}));

interface CustomIconProps extends Omit<unknown, "component"> {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
    className?: string;
}

export const CustomIcon: React.FunctionComponent<CustomIconProps> = ({
    svg: SvgComponent,
    ...props
}) => (
    <StyledSvgIcon sx={{ padding: "5px" }} {...props}>
        <SvgComponent />
    </StyledSvgIcon>
);
