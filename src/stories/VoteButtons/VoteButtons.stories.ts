import type { Meta, StoryObj } from "@storybook/react";
import { VoteButtons, VoteButtonsProps } from "../../components/VoteButtons/VoteButtons";

const meta: Meta<VoteButtonsProps> = {
    title: "Example/VoteButtons",
    component: VoteButtons,
    parameters: {
        layout: "fullscreen"
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
    args: {}
};
