import type { Meta, StoryObj } from "@storybook/react";
import { AppNameAndLogo } from "../../components/AppNameAndLogo/AppNameAndLogo";

const meta: Meta = {
    title: "Core/AppNameAndLogo",
    component: AppNameAndLogo,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PlainHeader: Story = {
    args: {}
};
