import { ThemeOptions } from "@mui/material/styles";
import { THEME_DARK } from "./constants";
import { baseTheme } from "./basetheme";

export const darkTheme: ThemeOptions = {
    ...baseTheme,
    palette: {
        mode: THEME_DARK,
        primary: {
            main: "#f2b4bf"
        },
        secondary: {
            main: "#44d2b8"
        },
        background: {
            default: "#303030",
            paper: "#424242"
        }
    },
    typography: {
        h5: {
            color: "#f2b4bf"
        },
        h6: {
            color: "#f5f5f5"
        }
    }
    // Add other customizations here
};
