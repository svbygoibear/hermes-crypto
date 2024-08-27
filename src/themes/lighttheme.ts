import { ThemeOptions } from "@mui/material/styles";
import { THEME_LIGHT } from "./constants";

export const lightTheme: ThemeOptions = {
    palette: {
        mode: THEME_LIGHT,
        primary: {
            main: "#f2b4bf"
        },
        secondary: {
            main: "#b4f2e7"
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff"
        }
    }
    // Add other customizations here
};
