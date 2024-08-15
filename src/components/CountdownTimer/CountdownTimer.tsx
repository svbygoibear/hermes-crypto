/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { FlipClock } from "./components/FlipClock/FlipClock";
import "./CountdownTimer.css";

export interface CountdownTimerProps {
    shouldCountDown: boolean;
    countdownTimeInSeconds: number;
    originalCountdownTimeInSeconds: number;
    onCountdownComplete: () => Promise<void>;
}

export const CountdownTimer: React.FunctionComponent<CountdownTimerProps> = (props: CountdownTimerProps) => {
    const [remainingSeconds, setRemainingSeconds] = useState(props.countdownTimeInSeconds);

    useEffect(() => {
        setRemainingSeconds(props.countdownTimeInSeconds);
    }, [props.countdownTimeInSeconds]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (props.shouldCountDown && remainingSeconds > 0) {
            intervalId = setInterval(() => {
                setRemainingSeconds((prevSeconds) => {
                    if (prevSeconds > 1) {
                        return prevSeconds - 1;
                    } else {
                        if (intervalId) {
                            clearInterval(intervalId);
                        }
                        props.onCountdownComplete();
                        return 0;
                    }
                });
            }, 1000);
        }
        if(!props.shouldCountDown && remainingSeconds === 0) {
            setRemainingSeconds(props.originalCountdownTimeInSeconds);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [props.shouldCountDown, remainingSeconds, props.onCountdownComplete]);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const pastHalfway = remainingSeconds < Math.floor(props.originalCountdownTimeInSeconds / 2) && remainingSeconds > 0;
    const isTimesUp = remainingSeconds === 0;

    const currentTimerMessage = (): JSX.Element => {
        if (pastHalfway) {
            return (
                <h3 className="status-message countdowntimer-countdown-alert">
                    PAST HALFWAY THERE!
                </h3>
            );
        } else if (isTimesUp) {
            return <h3 className=" status-message countdowntimer-times-up">TIME&apos;S UP!</h3>;
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
                    <FlipClock 
                        countMinutes={minutes === 1 && seconds === 0 ? 0 : minutes}
                        countSeconds={minutes === 1 && seconds === 0 ? 60 : seconds}
                    />
                </div>
            </div>
        </Container>
    );
};