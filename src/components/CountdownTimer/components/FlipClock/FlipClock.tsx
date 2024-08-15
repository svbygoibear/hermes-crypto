import React, { useState, useEffect } from "react";
import "./FlipClock.css";
import { FlipUnitContainer } from "../FlipUnitContainer/FlipUnitContainer";

export interface FlipClockProps {
    countMinutes: number;
    countSeconds: number;
}

export const FlipClock: React.FunctionComponent<FlipClockProps> = (props: FlipClockProps) => {
    const [minutes, setMinutes] = useState<number>(props.countMinutes);
    const [minutesShuffle, setMinutesShuffle] = useState<boolean>(true);
    const [seconds, setSeconds] = useState<number>(props.countSeconds);
    const [secondsShuffle, setSecondsShuffle] = useState<boolean>(true);

    useEffect(() => {
        if (props.countMinutes !== minutes) {
            setMinutes(props.countMinutes);
            setMinutesShuffle(prev => !prev);
        }
    }, [props.countMinutes, minutes]);

    useEffect(() => {
        if (props.countSeconds !== seconds) {
            setSeconds(props.countSeconds);
            setSecondsShuffle(prev => !prev);
        }
    }, [props.countSeconds, seconds]);

    return (
        <div className="flipclock-wrapper">
            <FlipUnitContainer unit="minutes" digit={minutes} shuffle={minutesShuffle} />
            <span className="flipclock-time-column">:</span>
            <FlipUnitContainer unit="seconds" digit={seconds} shuffle={secondsShuffle} />
        </div>
    );
};