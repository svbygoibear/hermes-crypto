import * as React from "react";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Warning from "@mui/icons-material/Warning";

export interface GlobalErrorAlertProps {
    title: string;
    message: string;
    onClose: () => void;
    retryAction?: () => void;
}

export const GlobalErrorAlert: React.FunctionComponent<GlobalErrorAlertProps> = (
    props: GlobalErrorAlertProps
) => {
    return (
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <Alert
                variant="soft"
                color="danger"
                invertedColors
                startDecorator={
                    <CircularProgress size="lg" color="danger">
                        <Warning />
                    </CircularProgress>
                }
                sx={{ alignItems: "flex-start", gap: "1rem" }}>
                <Box sx={{ flex: 1 }}>
                    <Typography level="title-md">{props.title}</Typography>
                    <Typography level="body-md">{props.message}</Typography>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <Button variant="outlined" size="sm" onClick={props.retryAction}>
                            Retry
                        </Button>
                        <Button variant="solid" size="sm" onClick={props.onClose}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Alert>
        </Stack>
    );
};
