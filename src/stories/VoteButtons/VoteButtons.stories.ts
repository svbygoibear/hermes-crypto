import type { Meta, StoryObj } from "@storybook/react";
import { VoteButtons, VoteButtonsProps } from "../../components/VoteButtons/VoteButtons";
import { VoteDirection } from "../../enums";
import { delay } from "../../utils/general.utils";

const meta: Meta<VoteButtonsProps> = {
    title: "Core/VoteButtons",
    component: VoteButtons,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
    args: {
        onVote: async (currentVote: VoteDirection) => {
            await delay(1000);
            alert(`Vote ${currentVote} submitted`);
        }
    }
};
