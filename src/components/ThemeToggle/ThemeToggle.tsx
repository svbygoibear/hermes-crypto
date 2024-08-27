import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { THEME_DARK, THEME_LIGHT } from "../../themes/constants";
import "@theme-toggles/react/css/Around.css";
import { Around } from "@theme-toggles/react";
import "./ThemeToggle.css";

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

    return (
        <Around
            className="theme-toggle-within"
            duration={750}
            style={{ color: themeName === THEME_LIGHT ? "#ffdfe5" : "#be4259" }}
            toggled={themeName === THEME_DARK}
            title={themeName === THEME_LIGHT ? "Switch to dark theme" : "Switch to light theme"}
            toggle={handleThemeChange}
            reversed
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
        />
    );
};
