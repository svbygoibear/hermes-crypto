import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export interface ResultsAlertProps {
    isOpen: boolean;
    alertText: string;
    onClose: () => void;
}

export const ResultsAlert: React.FunctionComponent<ResultsAlertProps> = (
    props: ResultsAlertProps
) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Collapse in={props.isOpen}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={props.onClose}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}>
                    {props.alertText}
                </Alert>
            </Collapse>
        </Box>
    );
};
