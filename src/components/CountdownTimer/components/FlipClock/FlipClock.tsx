import React, { useState, useEffect } from "react";
import "./FlipClock.css";
import { FlipUnitContainer } from "../FlipUnitContainer/FlipUnitContainer";

export interface FlipClockProps {
    countMinutes: number;
    countSeconds: number;
}

export const FlipClock: React.FunctionComponent<FlipClockProps> = (props: FlipClockProps) => {
    const [minutes, setMinutes] = useState<number>(0);
    const [minutesShuffle, setMinutesShuffle] = useState<boolean>(true);
    const [seconds, setSeconds] = useState<number>(0);
    const [secondsShuffle, setSecondsShuffle] = useState<boolean>(true);

    useEffect(() => {
        const timerID = setInterval(() => updateTime(), 50);
        return () => clearInterval(timerID);
    });

    const updateTime = () => {
        if (props.countMinutes !== minutes) {
            setMinutes(props.countMinutes);
            setMinutesShuffle(!minutesShuffle);
        }

        if (props.countSeconds !== seconds) {
            setSeconds(props.countSeconds);
            setSecondsShuffle(!secondsShuffle);
        }
    };

    return (
        <div className="flipClock-wrapper">
            <FlipUnitContainer unit="minutes" digit={minutes} shuffle={minutesShuffle} />
            <span className="flipClock-timeColumn">:</span>
            <FlipUnitContainer unit="seconds" digit={seconds} shuffle={secondsShuffle} />
        </div>
    );
};
