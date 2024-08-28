import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { themes, ThemeName } from "../themes";
import { THEME_LIGHT } from "../themes/constants";
import { useAppSelector } from "../hooks/useAppSelector";

interface ThemeContextType {
    themeName: ThemeName;
    setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const appSettings = useAppSelector(state => state.app);
    const [themeName, setThemeName] = useState<ThemeName>(
        (appSettings?.theme as ThemeName) ?? THEME_LIGHT
    );

    const theme = useMemo(() => createTheme(themes[themeName]), [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, setThemeName }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
