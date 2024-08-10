/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";
import { FlipClock } from "./components/FlipClock/FlipClock";
import { Button, Container, Grid, TextField } from "@mui/material";

export interface CountdownProps {
    shouldCountDown: boolean;
    countdownTimeInSeconds: number;
}

interface CountdownState {
    timerOn: boolean;
    timerStart: number;
    timerTime: number;
    value: string;
}

export const Countdown: React.FunctionComponent<CountdownProps> = (props: CountdownProps) => {
    const [state, setState] = useState<CountdownState>({
        timerOn: false,
        timerStart: 0,
        timerTime: props.countdownTimeInSeconds * 1000,
        value: ""
    });

    useEffect(() => {
        if (props.shouldCountDown) {
            countDownStart(1);
        } else {
            countDownStop();
        }
    }, [props.shouldCountDown]);

    useEffect(() => {
        console.log("Countdown component mounted");
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        console.log("value=", state.value);
    }, [state.value]);

    let timer: NodeJS.Timeout | undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const re = /^[0-9\b]+$/;

        if (e.target.value === "" || re.test(e.target.value)) {
            setState(prevState => ({
                ...prevState,
                value: e.target.value,
                timerTime: parseInt(e.target.value) * 60000 || 0
            }));
        }
    };

    const countDownStart = (timerS: number = 1): void => {
        clearInterval(timer);
        setState(prevState => ({
            ...prevState,
            timerOn: true,
            timerStart: prevState.timerTime
        }));

        timer = setInterval(() => {
            setState(prevState => {
                const newTime = prevState.timerTime - 10;

                if (newTime >= 0) {
                    return { ...prevState, timerTime: newTime };
                } else {
                    clearInterval(timer);
                    return { ...prevState, timerOn: false, timerTime: 0 };
                }
            });
        }, 10);
    };

    const countDownStop = (): void => {
        clearInterval(timer);
        setState(prevState => ({ ...prevState, timerOn: false }));
    };

    const resetTimer = (): void => {
        if (!state.timerOn) {
            setState(prevState => ({
                ...prevState,
                speed: 1,
                timerTime: parseInt(prevState.value) * 60000 || 0
            }));
        }
    };

    const { timerTime, timerStart, timerOn, value } = state;
    const seconds = parseInt(("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2));
    const minutes = Math.floor(timerTime / 60000);

    return (
        <Container maxWidth="sm">
            {/* <Grid container spacing={0} alignItems="center" className="countdowntimer-timerInput">
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="outlined-number"
                        label="Countdown Time"
                        variant="outlined"
                        value={value}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button
                        disabled={!value}
                        onClick={() => countDownStart(1)}
                        variant="contained"
                        color="secondary"
                        size="large">
                        Start
                    </Button>
                </Grid>
            </Grid> */}

            <div className="Countdown-time">
                {timerTime <= (parseInt(value) * 60000) / 2 && timerTime > 1000 && (
                    <h3 className="countdowntimer-countdownAlert">HALFWAY THERE!</h3>
                )}

                {timerStart !== 0 && timerTime <= 1000 && (
                    <h3 className="countdowntimer-timesUp">TIME&apos;S UP!</h3>
                )}

                <div className="countdowntimer-clockSim">
                    <FlipClock countMinutes={minutes} countSeconds={seconds} />

                    {/* <CountDownControls
                        timerStop={countDownStop}
                        timerStart={countDownStart}
                        timerReset={resetTimer}
                        timerisOn={timerOn}
                        timerT={timerTime}
                        timerS={timerStart}
                        speedSet={speed}
                    /> */}
                    {/* TODO: add buttons here to start the coutndown timer */}

                    {/* remove timer speed controls here */}
                </div>
            </div>
        </Container>
    );
};
