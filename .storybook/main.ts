import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions"
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    async viteFinal(config, { configType }) {
        // Add SVGR support
        config.plugins = config.plugins || [];
        config.plugins.push(require("@svgr/rollup").default());
        return config;
    }
};
export default config;
