import { create } from "@storybook/theming/create";
import { lightTheme } from "./../src/themes/lighttheme";
import { darkTheme } from "./../src/themes/darktheme";

const createMuiStorybookTheme = (muiTheme: any) => {
    console.log("MUI Theme:", JSON.stringify(muiTheme, null, 2));

    // Ensure muiTheme is defined
    if (!muiTheme || typeof muiTheme !== "object") {
        console.error("Invalid MUI theme provided to createMuiStorybookTheme");
        return create({ base: "light" }); // Return a default theme to prevent further errors
    }

    return create({
        base: muiTheme.palette?.mode || "light",

        // Color palette
        colorPrimary: muiTheme.palette?.primary?.main || "#1976d2",
        colorSecondary: muiTheme.palette?.secondary?.main || "#9c27b0",

        // UI
        appBg: muiTheme.palette?.background?.default || "#fff",
        appContentBg: muiTheme.palette?.background?.paper || "#fff",
        appBorderColor: muiTheme.palette?.divider || "#e0e0e0",
        appBorderRadius: muiTheme.shape?.borderRadius || 4,

        // Typography
        fontBase: muiTheme.typography?.fontFamily || "Roboto, sans-serif",
        fontCode: "monospace",

        // Text colors
        textColor: muiTheme.palette?.text?.primary || "#000",
        textInverseColor: muiTheme.palette?.getContrastText
            ? muiTheme.palette.getContrastText(muiTheme.palette.background.default)
            : "#fff",

        // Toolbar default and active colors
        barTextColor: muiTheme.palette?.text?.secondary || "#666",
        barSelectedColor: muiTheme.palette?.primary?.main || "#1976d2",
        barBg: muiTheme.palette?.background?.paper || "#fff",

        // Form colors
        inputBg: muiTheme.palette?.background?.paper || "#fff",
        inputBorder: muiTheme.palette?.divider || "#e0e0e0",
        inputTextColor: muiTheme.palette?.text?.primary || "#000",
        inputBorderRadius: muiTheme.shape?.borderRadius || 4,

        // Brand
        brandTitle: "Your App Name",
        brandUrl: "https://your-app-url.com",
        brandImage: "https://your-logo-url.com"
    });
};

export const lightStorybookTheme = createMuiStorybookTheme(lightTheme);
export const darkStorybookTheme = createMuiStorybookTheme(darkTheme);
