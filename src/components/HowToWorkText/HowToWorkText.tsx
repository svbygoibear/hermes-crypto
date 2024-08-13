import React from "react";
import "./HowToWorkText.css";
import { CoinResult } from "../../types/coinResult";

export interface HowToWorkTextProps {
    isFetchingBtc: boolean;
    currentCoinResult: CoinResult | null;
}

export const HowToWorkText: React.FunctionComponent<HowToWorkTextProps> = (
    props: HowToWorkTextProps
) => {
    const loadingString = "loading...";

    const loadingElement = <code className="how-to-work-text-loading-text">{loadingString}</code>;
    const couldNotLoadElement = <code className="how-to-work-text-error-text">COULD NOT LOAD</code>;
    const loadedElement = (value: string) => (
        <code className="how-to-work-text-loaded-text">{value}</code>
    );

    const getTextElement = (value: string | null): JSX.Element => {
        if (props.isFetchingBtc) {
            return loadingElement;
        }
        if (value === null) {
            return couldNotLoadElement;
        }
        return loadedElement(value);
    };

    const getPriceText = (currency: string | null, value: number | null): JSX.Element => {
        if (props.isFetchingBtc) {
            return loadingElement;
        }
        if (value === null || currency === null) {
            return couldNotLoadElement;
        }
        return loadedElement(`${currency} ${value}`);
    };

    const getFormattedDateTime = (value: string | null): JSX.Element => {
        let date = new Date("");
        try {
            date = new Date(Date.parse(value ?? ""));
        } catch (error) {
            return couldNotLoadElement;
        }
        if (props.isFetchingBtc) {
            return loadingElement;
        }
        if (value === null) {
            return couldNotLoadElement;
        }

        return loadedElement(`${date?.toLocaleTimeString()}`);
    };

    return (
        <div className="how-to-work-text-wrapper">
            <p className="how-to-work-text-general-text">
                So how does this work?{" "}
                <b>
                    <code>Hermes-Crypto</code>
                </b>{" "}
                is a fun site to pass the time while you wait for your code to build, a deployment
                to finish or just want to kill some time while your &rsquo;spro is brewing. Vote up
                if you think the price is going to go up, or vote down if you think the price is
                going to go down. If you guess correctly - you will get <b>+1</b> point! Guess
                wrong... That will be <b>-1</b> on your total.
            </p>
            <p className="how-to-work-text-general-text">
                The current price of {getTextElement(props.currentCoinResult?.vote_coin ?? null)} is{" "}
                {getPriceText(
                    props.currentCoinResult?.coin_value_currency ?? null,
                    props.currentCoinResult?.coin_value ?? null
                )}
            </p>
            <p className="how-to-work-text-general-text">
                Price was last queried on:{" "}
                <code>{getFormattedDateTime(props.currentCoinResult?.query_time ?? null)}</code>
            </p>
        </div>
    );
};
