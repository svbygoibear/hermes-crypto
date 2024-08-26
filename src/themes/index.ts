import { lightTheme } from "./lighttheme";
import { darkTheme } from "./darktheme";

export const themes = {
    light: lightTheme,
    dark: darkTheme
};

export type ThemeName = keyof typeof themes;
