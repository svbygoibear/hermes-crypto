import * as React from "react";
import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router-dom";
import { LayoutBox } from "../../layouts/LayoutBox/LayoutBox";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./GenericError.css";
import NotFound from "../../assets/not-found.png";
import { HOME_ROUTE } from "../../routes";

export const GenericError: React.FunctionComponent = () => {
    const navigate = useNavigate();
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
        errorMessage = "Unknown Error";
    }

    const onBackHomeClick = (): void => {
        navigate(HOME_ROUTE);
    };

    return (
        <LayoutBox>
            <React.Fragment>
                <CssBaseline />
                <Box sx={{ minHeight: "100%" }}>
                    <Container sx={{ display: "flex", flexWrap: "wrap" }} maxWidth={false}>
                        <div>
                            <img
                                className="general-error-image"
                                src={NotFound}
                                alt="Page-Not-Found-Dude"
                            />
                            <div
                                title={`Error message: ${errorMessage}`}
                                className="general-error-dynamic-message">
                                {errorMessage}
                            </div>
                        </div>

                        <div className="general-error-content">
                            <h2 className="general-error-info">I have bad news...</h2>
                            <p className="general-error-text">
                                Something went wrong! Which isn&apos;t great... but it could also be
                                worse? It is probably the server gremlins going at it again. Try
                                refreshing the page, or go back to the homepage.
                            </p>
                            <Button onClick={onBackHomeClick} sx={{ marginBlockEnd: "50px" }}>
                                Back to homepage
                            </Button>
                        </div>
                    </Container>
                </Box>
            </React.Fragment>
        </LayoutBox>
    );
};
