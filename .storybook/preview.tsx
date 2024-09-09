import React from "react";
import type { Preview, StoryContext, StoryFn } from "@storybook/react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme, CssBaseline, Theme, useTheme } from "@mui/material";
import { darkTheme } from "../src/themes/darktheme";
import { lightTheme } from "../src/themes/lighttheme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { StoreDecorator } from "./storedecorator";
import { darkStorybookTheme, lightStorybookTheme } from "./muistorybooktheme";
import { useDarkMode } from "storybook-dark-mode";

const fallbackLightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1976d2" },
        secondary: { main: "#9c27b0" }
    }
});

const fallbackDarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#90caf9" },
        secondary: { main: "#f48fb1" }
    }
});

// Wrapper component to ensure a valid theme
const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isDarkMode = useDarkMode();
    let theme: Theme = isDarkMode
        ? ((darkTheme && "palette" in darkTheme ? darkTheme : fallbackDarkTheme) as Theme)
        : ((lightTheme && "palette" in lightTheme ? lightTheme : fallbackLightTheme) as Theme);

    // Ensure the theme has all necessary properties
    theme = createTheme(theme);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

// Component to log theme for debugging
const ThemeDebugger: React.FC = () => {
    const theme = useTheme();
    console.log("Current theme:", theme);
    return null;
};

const withMuiTheme = (Story: StoryFn, context: StoryContext) => {
    const isDarkMode = useDarkMode();
    const storyTheme = isDarkMode ? darkStorybookTheme : lightStorybookTheme;

    // Update Storybook's theme
    if (context.parameters.docs) {
        context.parameters.docs.theme = storyTheme;
    }

    return (
        <ThemeWrapper>
            <ThemeDebugger />
            <Story />
        </ThemeWrapper>
    );
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        docs: {
            theme: lightStorybookTheme
        }
    },
    decorators: [
        StoreDecorator
        // ,withMuiTheme
    ],
    globalTypes: {
        theme: {
            name: "Theme",
            description: "Global theme for components",
            defaultValue: "light",
            toolbar: {
                icon: "circlehollow",
                items: ["light", "dark"],
                showName: true
            }
        }
    }
};

export default preview;
