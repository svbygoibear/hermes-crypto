import * as React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { LayoutBox } from "../../layouts/LayoutBox/LayoutBox";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

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
                        <div id="error-page">
                            <h1>Oops!</h1>
                            <p>Sorry, an unexpected error has occurred.</p>
                            <p>
                                <i>{errorMessage}</i>
                            </p>
                        </div>
                    </Box>
                </Container>
            </React.Fragment>
        </LayoutBox>
    );
};
