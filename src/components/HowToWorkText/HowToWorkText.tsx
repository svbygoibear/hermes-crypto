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
                The current price of{" "}
                <code>{props.isFetchingBtc ? loadingString : props.currentCoinResult?.coin}</code>{" "}
                is{" "}
                <code>
                    {props.isFetchingBtc
                        ? loadingString
                        : props.currentCoinResult?.coin_value_currency}{" "}
                    {props.isFetchingBtc ? "" : props.currentCoinResult?.coin_value}
                </code>
            </p>
            <p className="read-the-docs">
                Price was last queries on:{" "}
                <code>
                    {props.isFetchingBtc
                        ? loadingString
                        : props.currentCoinResult?.query_time.toDateString()}
                </code>
            </p>
        </div>
    );
};
