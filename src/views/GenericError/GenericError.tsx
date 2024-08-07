import * as React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { LayoutBox } from "../../layouts/LayoutBox/LayoutBox";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./GenericError.css";
import NotFound from "../../assets/not-found.png";

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
                <Box sx={{ bgcolor: "#cfe8fc", minHeight: "100%" }}>
                    <Container
                        sx={{ bgcolor: "#cfe8fc", display: "flex", flexWrap: "wrap" }}
                        maxWidth={false}>
                        <div className="general-error-image">
                            <img src={NotFound} alt="Page-Not-Found-Dude" />
                        </div>
                        <div className="general-error-content">
                            <h2 className="general-error-info">I have bad news for you</h2>
                            <p className="general-error-text">
                                Something went wrong! Which isn&apos;t great... but it could also be
                                worse? It is probably the server gremlins going at it again. Try
                                refreshing the page, or go back to the homepage.
                                {errorMessage}
                            </p>
                            <Button>Back to homepage</Button>
                        </div>
                    </Container>
                </Box>
            </React.Fragment>
        </LayoutBox>
    );
};
