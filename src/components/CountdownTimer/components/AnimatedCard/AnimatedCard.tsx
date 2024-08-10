import React from "react";
import "./AnimatedCard.css";

export interface AnimatedCardProps {
    animation: string;
    digit: number | string;
}

export const AnimatedCard: React.FunctionComponent<AnimatedCardProps> = (
    props: AnimatedCardProps
) => {
    return (
        <div className={`animatedcard-flipCard ${props.animation}`}>
            <span>{props.digit}</span>
        </div>
    );
};
