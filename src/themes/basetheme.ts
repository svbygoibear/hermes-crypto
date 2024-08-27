import { ThemeOptions } from "@mui/material/styles";

export const baseTheme: ThemeOptions = {
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "2.5rem",
            fontWeight: 500
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
