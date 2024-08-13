import React from "react";
import "./HowToWorkText.css";
import { CoinResult } from "../../types/coin-result";

export interface HowToWorkTextProps {
    isFetchingBtc: boolean;
    currentCoinResult: CoinResult | null;
}

export const HowToWorkText: React.FunctionComponent<HowToWorkTextProps> = (
    props: HowToWorkTextProps
) => {
    const loadingString = "loading...";

    const getTextElement = (value: string | null): JSX.Element => {
        if (props.isFetchingBtc) {
            return <code>{loadingString}</code>;
        }
        if (value === null) {
            return <code>COULD NOT LOAD</code>;
        }

        return <code>{value}</code>;
    };

    const getPriceText = (currency: string | null, value: number | null): JSX.Element => {
        if (props.isFetchingBtc) {
            return <code>{loadingString}</code>;
        }
        if (value === null || currency === null) {
            return <code>COULD NOT LOAD</code>;
        }

        return (
            <code>
                {currency} {value}
            </code>
        );
    };

    const getFormattedDateTime = (value: Date | null): JSX.Element => {
        if (props.isFetchingBtc) {
            return <code>{loadingString}</code>;
        }
        if (value === null) {
            return <code>COULD NOT LOAD</code>;
        }

        return <code>{`${value}`}</code>;
    };

    return (
        <div className="how-to-work-text-wrapper">
            <p className="read-the-docs">
                So how does this work? <code>Hermes-Crypto</code> is a fun site to pass the time
                while you wait for your code to build, a deployment to finish or just want to kill
                some time while your &rsquo;spro is brewing. Vote up if you think the price is going
                to go up, or vote down if you think the price is going to go down. If you guess
                correctly - you will get +1 point! Guess wrong... That will be -1 on your total.
            </p>
            <p className="read-the-docs">
                The current price of {getTextElement(props.currentCoinResult?.coin ?? null)} is{" "}
                {getPriceText(
                    props.currentCoinResult?.coin_value_currency ?? null,
                    props.currentCoinResult?.coin_value ?? null
                )}
            </p>
            <p className="read-the-docs">
                Price was last queries on:{" "}
                <code>{getFormattedDateTime(props.currentCoinResult?.query_time ?? null)}</code>
            </p>
        </div>
    );
};
