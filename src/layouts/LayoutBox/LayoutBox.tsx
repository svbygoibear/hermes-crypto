import * as React from "react";
import Box from "@mui/material/Box";

export interface LayoutBoxProps {
    children: JSX.Element | JSX.Element[];
}

export const LayoutBox: React.FunctionComponent<LayoutBoxProps> = (props: LayoutBoxProps) => {
    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            {props.children}
        </Box>
    );
};
