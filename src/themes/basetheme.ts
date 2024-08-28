import { ThemeOptions } from "@mui/material/styles";

export const baseTheme: ThemeOptions = {
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "3.2em",
            fontWeight: 500,
            lineHeight: 1.1
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 500
        }
        // Add other typography settings
    },
    shape: {
        borderRadius: 8
    }
    // Add other shared customizations here
};
