import type { Meta, StoryObj } from "@storybook/react";
import {
    GlobalErrorAlert,
    GlobalErrorAlertProps
} from "../../components/GlobalErrorAlert/GlobalErrorAlert";

const meta: Meta<GlobalErrorAlertProps> = {
    title: "Example/GlobalErrorAlert",
    component: GlobalErrorAlert,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CloseOnly: Story = {
    args: {
        title: "FAILED",
        message: "Failed to load data"
    }
};

export const RetryAvailable: Story = {
    args: {
        title: "ERROR OCCURRED",
        message: "Failed to submit vote, please try again.",
        retryAction: () => {
            alert("Retry action invoked");
        }
    }
};
