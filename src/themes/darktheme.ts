import { ThemeOptions } from "@mui/material/styles";
import { THEME_DARK } from "./constants";

export const darkTheme: ThemeOptions = {
    palette: {
        mode: THEME_DARK,
        primary: {
            main: "#950033"
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
