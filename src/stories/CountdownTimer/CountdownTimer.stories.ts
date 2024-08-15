import type { Meta, StoryObj } from "@storybook/react";
import {
    CountdownTimer,
    CountdownTimerProps
} from "../../components/CountdownTimer/CountdownTimer";

const meta: Meta<CountdownTimerProps> = {
    title: "Core/CountdownTimer",
    component: CountdownTimer,
    parameters: {
        layout: "fullscreen"
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const StaticDefault: Story = {
    args: {
        shouldCountDown: false,
        countdownTimeInSeconds: 10,
        originalCountdownTimeInSeconds: 10,
        onCountdownComplete: () => {
            alert("Countdown Complete");
        }
    }
};

export const BusyCounting: Story = {
    args: {
        shouldCountDown: true,
        countdownTimeInSeconds: 10,
        originalCountdownTimeInSeconds: 25,
        onCountdownComplete: () => {
            alert("Countdown Complete");
        }
    }
};
