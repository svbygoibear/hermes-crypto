import type { Meta, StoryObj } from "@storybook/react";
import { HowToWorkText, HowToWorkTextProps } from "../../components/HowToWorkText/HowToWorkText";
import { CoinType, Currency } from "../../enums";

const meta: Meta<HowToWorkTextProps> = {
    title: "Core/HowToWorkText",
    component: HowToWorkText,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HasValues: Story = {
    args: {
        isFetchingBtc: false,
        currentCoinResult: {
            vote_coin: CoinType.Bitcoin,
            coin_value: 100,
            coin_value_currency: Currency.USD,
            query_time: "2021-08-08T00:00:00Z"
        }
    }
};

export const CouldNotLoad: Story = {
    args: {
        isFetchingBtc: false,
        currentCoinResult: null
    }
};
