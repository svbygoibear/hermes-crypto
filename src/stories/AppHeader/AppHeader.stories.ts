import type { Meta, StoryObj } from "@storybook/react";
import { AppHeader, AppHeaderProps } from "../../components/AppHeader/AppHeader";

const meta: Meta<AppHeaderProps> = {
    title: "Global/AppHeader",
    component: AppHeader,
    parameters: {
        layout: "fullscreen"
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        isLoggedIn: true
    }
};

export const LoggedOut: Story = {
    args: {
        isLoggedIn: false
    }
};
