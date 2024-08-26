import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

import { THEME_DARK, THEME_LIGHT } from "../../themes/constants";
import "@theme-toggles/react/css/Horizon.css";
import { Horizon } from "@theme-toggles/react";

export interface ThemeToggleProps {
    onThemeToggle: (name: string) => void;
}

export const ThemeToggle: React.FunctionComponent<ThemeToggleProps> = (props: ThemeToggleProps) => {
    const { themeName, setThemeName } = useTheme();

    const handleThemeChange = () => {
        const newTheme = themeName === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        setThemeName(newTheme);
        props.onThemeToggle(newTheme);
    };

    return <Horizon duration={750} toggled={themeName === THEME_DARK} toggle={handleThemeChange} />;
};
