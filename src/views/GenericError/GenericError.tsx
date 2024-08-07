import * as React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { LayoutBox } from "../../layouts/LayoutBox/LayoutBox";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./GenericError.css";

export const GenericError: React.FunctionComponent = () => {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = "Unknown error";
    }

    return (
        <LayoutBox>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Box sx={{ bgcolor: "#cfe8fc", height: "100%" }}>
                        <div className="general-error-display-wrapper">
                            <div className="general-error-image">
                                <img src={require("../assets/Scarecrow.png")} alt="404-Scarecrow" />
                            </div>
                            <div className="general-error-content">
                                <h2 className="general-error-info">I have bad news for you</h2>
                                <p className="general-error-text">
                                    Something went wrong! Which isn&apos;t great... but it could
                                    also be worse? It is probaly the server gremlins going at it
                                    again. Try refreshing the page, or go back to the homepage.
                                    {errorMessage}
                                </p>
                                <Button className="btn">Back to homepage</Button>
                            </div>
                        </div>
                    </Box>
                </Container>
            </React.Fragment>
        </LayoutBox>
    );
};
