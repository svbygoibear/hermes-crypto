import { ThemeOptions } from "@mui/material/styles";
import { THEME_LIGHT } from "./constants";
import { baseTheme } from "./basetheme";

export const lightTheme: ThemeOptions = {
    ...baseTheme,
    palette: {
        mode: THEME_LIGHT,
        primary: {
            main: "#cb0038"
        },
        secondary: {
            main: "#39c8aa"
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff"
        }
    },
    typography: {
        h5: {
            color: "#cb0038"
        },
        h6: {
            color: "#303030"
        }
    }
    // Add other customizations here
};
