import React from "react";
import "./StaticCard.css";

export interface AnimatedCardProps {
    position: string;
    digit: number | string;
}

export const StaticCard: React.FunctionComponent<AnimatedCardProps> = (
    props: AnimatedCardProps
) => {
    return (
        <div className={props.position}>
            <span>{props.digit}</span>
        </div>
    );
};
