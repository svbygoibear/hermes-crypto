import React from "react";
import "./StaticCard.css";

export interface StaticCardProps {
    position: string;
    digit: number | string;
}

export const StaticCard: React.FunctionComponent<StaticCardProps> = (
    props: StaticCardProps
) => {
    return (
        <div className={props.position}>
            <span>{props.digit}</span>
        </div>
    );
};
