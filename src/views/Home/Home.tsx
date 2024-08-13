import React, { useEffect, useState } from "react";
import "./Home.css";
import HermesLogo from "./../../assets/svg/hermes-crypto-logo.svg";
import { CustomIcon } from "./../../components/CustomIcon/CustomIcon";
import { CountdownTimer } from "../../components/CountdownTimer/CountdownTimer";
import { VoteButtons } from "../../components/VoteButtons/VoteButtons";
import { VoteDirection } from "../../enums";
import { VOTE_TIME_IN_SECONDS } from "../../constants";
import { getUserById, getUserVotesById } from "../../data/user.data";

export interface HomeProps {
    isLoggedIn: boolean;
}

export const Home: React.FunctionComponent<HomeProps> = () => {
    const [isVoting, setIsVoting] = useState<boolean>(false);

    useEffect(() => {
        void testGetUser();
        void setupHomePage();
    });

    const setupHomePage = async () => {
        // TODO: code here
    };

    const testGetUser = async () => {
        console.log("ANOTHER TEST");
        const user = await getUserById("272b6ba2-528d-41af-86b2-b366eaa55a38");
        const votes = await getUserVotesById("272b6ba2-528d-41af-86b2-b366eaa55a38");
        console.log(user);
        console.log(votes);
    };

    // TODO: on load - check if user has already voted/logged in > if so set isVoting to true
    // update the current vote time to what the user has left

    const onVoteClicked = async (vote: VoteDirection): Promise<void> => {
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
            <h2>
                Welcome back, <code>[your-name-here]</code>
            </h2>
            <div className="card">
                <VoteButtons onVote={onVoteClicked} isVoting={isVoting} />
                <CountdownTimer
                    shouldCountDown={isVoting}
                    countdownTimeInSeconds={VOTE_TIME_IN_SECONDS}
                    onCountdownComplete={onVoteDone}
                />
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the HermesCrypto and React logos to learn more</p>
        </div>
    );
};
