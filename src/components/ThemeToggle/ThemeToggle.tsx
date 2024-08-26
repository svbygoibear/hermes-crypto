import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeName } from "../../themes";
import { THEME_DARK, THEME_LIGHT } from "../../themes/constants";

export const ThemeToggle: React.FC = () => {
    const { themeName, setThemeName } = useTheme();

    const handleThemeChange = (newTheme: ThemeName) => {
        setThemeName(newTheme);
    };

    return (
        <ButtonGroup>
            <Button
                variant={themeName === THEME_LIGHT ? "contained" : "outlined"}
                onClick={() => handleThemeChange(THEME_LIGHT)}>
                Light
            </Button>
            <Button
                variant={themeName === THEME_DARK ? "contained" : "outlined"}
                onClick={() => handleThemeChange(THEME_DARK)}>
                Dark
            </Button>
        </ButtonGroup>
    );
};
