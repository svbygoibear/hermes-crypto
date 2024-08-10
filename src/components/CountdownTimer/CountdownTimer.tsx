/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "./CountdownTimer.css";
import { FlipClock } from "./components/FlipClock/FlipClock";
import { Container } from "@mui/material";

export interface CountdownProps {
    shouldCountDown: boolean;
    countdownTimeInSeconds: number;
    onCountdownComplete: () => void;
}

export const Countdown: React.FunctionComponent<CountdownProps> = (props: CountdownProps) => {
    const [timerStart, setTimerStart] = useState<number>(0);
    const [timerTime, setTimerTime] = useState<number>(props.countdownTimeInSeconds * 1000);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (props.shouldCountDown) {
            setTimerTime(props.countdownTimeInSeconds * 1000);
            countDownStart();
        }

        // Clean up the interval on component unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [props.shouldCountDown]);

    const countDownStart = (): void => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setTimerStart(timerTime);

        timerRef.current = setInterval(() => {
            setTimerTime(prevTime => {
                const newTime = prevTime - 10;
                if (newTime >= 0) {
                    return newTime;
                } else {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                    // Alert the parent component that the countdown is complete
                    props.onCountdownComplete();
                    setTimerStart(0);
                    return props.countdownTimeInSeconds * 1000;
                }
            });
        }, 10);
    };

    const totalSeconds = Math.floor(timerTime / 1000);
    const minutes = totalSeconds === 60 ? 0 : Math.floor(totalSeconds / 60);
    const seconds = totalSeconds === 60 ? totalSeconds : totalSeconds % 60;

    const isHalfway = timerTime > timerStart / 2 && timerTime > 1000;
    const isTimesUp = timerStart !== 0 && timerTime <= 1000;

    return (
        <Container maxWidth="sm">
            <div className="Countdown-time">
                {isHalfway && <h3 className="countdowntimer-countdownAlert">HALFWAY THERE!</h3>}

                {isTimesUp && <h3 className="countdowntimer-timesUp">TIME&apos;S UP!</h3>}

                <div className="countdowntimer-clockSim">
                    <FlipClock countMinutes={minutes} countSeconds={seconds} />
                </div>
            </div>
        </Container>
    );
};
