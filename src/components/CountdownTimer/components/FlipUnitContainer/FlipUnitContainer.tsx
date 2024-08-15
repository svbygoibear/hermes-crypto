import React from "react";
import "./FlipUnitContainer.css";
import { StaticCard } from "../StaticCard/StaticCard";
import { AnimatedCard } from "../AnimatedCard/AnimatedCard";

interface FlipUnitContainerProps {
    digit: number | string;
    shuffle: boolean;
    unit: "minutes" | "seconds";
}

export const FlipUnitContainer: React.FunctionComponent<FlipUnitContainerProps> = (
    props: FlipUnitContainerProps
) => {
    let currentDigit: number | string = props.digit;
    let previousDigit: number | string = parseInt(props.digit as string) + 1;

    if (typeof currentDigit === "number" && currentDigit < 10 && (props.unit === "minutes" || props.unit === "seconds")) {
        currentDigit = `0${currentDigit}`;
    }
    if (previousDigit < 10) {
        previousDigit = `0${previousDigit}`;
    }

    const digit1 = props.shuffle ? previousDigit : currentDigit;
    const digit2 = !props.shuffle ? previousDigit : currentDigit;

    const animation1 = props.shuffle ? "fold" : "unfold";
    const animation2 = !props.shuffle ? "fold" : "unfold";

    return (
        <div className="flipunitcontainer-wrapper">
            <StaticCard position="uppercard" digit={currentDigit} />
            <StaticCard position="lowercard" digit={previousDigit} />
            <AnimatedCard digit={digit1} animation={animation1} />
            <AnimatedCard digit={digit2} animation={animation2} />
        </div>
    );
};
