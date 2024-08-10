/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./Home.css";
import HermesLogo from "./../../assets/svg/hermes-crypto-logo.svg";
import { CustomIcon } from "./../../components/CustomIcon/CustomIcon";
import { Countdown } from "../../components/CountdownTimer/CountdownTimer";
import { VoteButtons } from "../../components/VoteButtons/VoteButtons";
import { Vote } from "../../enums";
import { VOTE_TIME_IN_SECONDS } from "../../constants";

export interface HomeProps {
    isLoggedIn: boolean;
}

export const Home: React.FunctionComponent<HomeProps> = () => {
    const [isVoting, setIsVoting] = useState<boolean>(false);

    const onVoteClicked = async (vote: Vote): Promise<void> => {
        setIsVoting(true);
        try {
            console.log(`Voting ${vote}`);
            // TODO: Call the API to vote
        } catch (error) {
            console.error(error);
        }
    };

    const onVoteDone = (): void => {
        setIsVoting(false);
    };

    return (
        <div className="home-wrapper">
            <div>
                <CustomIcon svg={HermesLogo} className="logo spin" />
            </div>
            <h1>Hermes-Crypto</h1>
            <h2>Welcome back, [your-name-here]</h2>
            <div className="card">
                <VoteButtons onVote={onVoteClicked} onVoteFinalized={onVoteDone} />
                <Countdown
                    shouldCountDown={isVoting}
                    countdownTimeInSeconds={VOTE_TIME_IN_SECONDS}
                />
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the HermesCrypto and React logos to learn more</p>
        </div>
    );
};
