import type { Meta, StoryObj } from "@storybook/react";
import {
    WelcomeSignNote,
    WelcomeSignNoteProps
} from "../../components/WelcomeSignNote/WelcomeSignNote";
import { delay } from "../../utils/general.utils";

const meta: Meta<WelcomeSignNoteProps> = {
    title: "Core/WelcomeSignNote",
    component: WelcomeSignNote,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SignedIn: Story = {
    args: {
        isLoggedIn: true,
        userName: "John Doe",
        userEmail: "john@doe.com",
        onSignIn: async () => {
            alert("Sign in clicked");
            await delay(1000);
        }
    }
};
