import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import "./ResultsAlert.css";

import PlayerWonIcon from "../../assets/player-won.gif";
import PlayerLostIcon from "../../assets/player-lost.gif";

export interface ResultsAlertProps {
    isOpen: boolean;
    isPositive: boolean;
    alertText: string;
    onClose: () => void;
}

export const ResultsAlert: React.FunctionComponent<ResultsAlertProps> = (
    props: ResultsAlertProps
) => {
    return (
        <Box sx={{ 
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                maxWidth: "400px",
                zIndex: 9999 }}>
            <Collapse in={props.isOpen}>
                {props.isOpen && (
                    <Alert  
                        severity={props.isPositive ? "success" : "warning"}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={props.onClose}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        <b>{props.alertText}</b>
                        {props.isPositive && (
                            <img className="results-alert-player-image" alt="Player has WON!" src={PlayerWonIcon}/>
                        )}
                        {!props.isPositive && (
                            <img className="results-alert-player-image" alt="Player has LOST." src={PlayerLostIcon}/>
                        )}
                        <div>{props.isPositive ? `You have won! Clearly the GODS favour you.` : `Whelp! You lost, and Hermes frowns upon you.`}</div>
                    </Alert>
                )}
            </Collapse>
        </Box>
    );
};
