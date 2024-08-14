/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "./CountdownTimer.css";
import { FlipClock } from "./components/FlipClock/FlipClock";
import { Container } from "@mui/material";

export interface CountdownTimerProps {
    shouldCountDown: boolean;
    countdownTimeInSeconds: number;
    onCountdownComplete: () => void;
}

export const CountdownTimer: React.FunctionComponent<CountdownTimerProps> = (
    props: CountdownTimerProps
) => {
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

    const currentTimerMessage = (): JSX.Element => {
        const isHalfway = timerTime <= props.countdownTimeInSeconds * 500 && timerTime > 1000;
        const isTimesUp = timerStart !== 0 && timerTime <= 1000;

        if (isHalfway) {
            return (
                <h3 className="countdowntimer-countdown-alert status-message">
                    PAST HALFWAY THERE!
                </h3>
            );
        } else if (isTimesUp) {
            return <h3 className="countdowntimer-times-up status-message">TIME&apos;S UP!</h3>;
        } else if (!props.shouldCountDown) {
            return <h3 className="status-message">Ready to get started? Vote!</h3>;
        } else {
            return <h3 className="status-message">Time remaining:</h3>;
        }
    };

    return (
        <Container maxWidth="sm">
            <div className="countdowntimer-time">
                {currentTimerMessage()}

                <div className="countdowntimer-clock-sim">
                    <FlipClock countMinutes={minutes} countSeconds={seconds} />
                </div>
            </div>
        </Container>
    );
};
