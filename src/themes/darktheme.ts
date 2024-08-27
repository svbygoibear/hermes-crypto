import { ThemeOptions } from "@mui/material/styles";
import { THEME_DARK } from "./constants";
import { baseTheme } from "./basetheme";

export const darkTheme: ThemeOptions = {
    ...baseTheme,
    palette: {
        mode: THEME_DARK,
        primary: {
            main: "#be4259"
        },
        secondary: {
            main: "#23775e"
        },
        background: {
            default: "#303030",
            paper: "#424242"
        }
    }
    // Add other customizations here
};
