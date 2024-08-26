import { ThemeOptions } from "@mui/material/styles";
import { THEME_LIGHT } from "./constants";

export const lightTheme: ThemeOptions = {
    palette: {
        mode: THEME_LIGHT,
        primary: {
            main: "#1976d2"
        },
        secondary: {
            main: "#dc004e"
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff"
        }
    }
    // Add other customizations here
};
