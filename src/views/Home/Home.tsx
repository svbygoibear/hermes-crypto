/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import HermesLogo from "./../../assets/svg/hermes-crypto-logo.svg";
import { CustomIcon } from "./../../components/CustomIcon/CustomIcon";
import { CountdownTimer } from "../../components/CountdownTimer/CountdownTimer";
import { VoteButtons } from "../../components/VoteButtons/VoteButtons";
import { VoteDirection } from "../../enums";
import { VOTE_TIME_IN_SECONDS } from "../../constants";
import { getCurrentBtcPrice, getUserById, getUserVotesById } from "../../data/user.data";
import { HowToWorkText } from "../../components/HowToWorkText/HowToWorkText";
import { CoinResult } from "../../types/coin-result";
import { WelcomeSignNote } from "../../components/WelcomeSignNote/WelcomeSignNote";

export interface HomeProps {
    isLoggedIn: boolean;
}

export const Home: React.FunctionComponent<HomeProps> = (props: HomeProps) => {
    const [isVoting, setIsVoting] = useState<boolean>(false);
    const [latestBtc, setLatestBtc] = useState<CoinResult | null>(null);
    const [isFetchingBtc, setIsFetchingBtc] = useState<boolean>(false);

    const location = useLocation(); // If using React Router

    useEffect(() => {
        // Handle scrolling when component mounts or updates
        if (location.hash) {
            setTimeout(() => {
                const id = location.hash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 0);
        }
    }, [location]);

    // On mount > setup the home page
    useEffect(() => {
        void testGetUser();
        void getBTC();
    }, []);

    const getBTC = async () => {
        // TODO: add call to the API back
        const currentBtcPrice = await getCurrentBtcPrice();
        setLatestBtc(currentBtcPrice);
        setIsFetchingBtc(false);
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

    const onSignIn = async (): Promise<void> => {
        // TODO: Add sign in logic
    };

    return (
        <div className="home-wrapper">
            <div id="my-game">
                <div>
                    <CustomIcon svg={HermesLogo} className="logo spin" />
                </div>
                <h1>Hermes-Crypto</h1>
                <WelcomeSignNote
                    isLoggedIn={props.isLoggedIn}
                    userEmail=""
                    userName=""
                    onSignIn={onSignIn}
                />
                <HowToWorkText isFetchingBtc={isFetchingBtc} currentCoinResult={latestBtc} />
                <div className="card">
                    <VoteButtons onVote={onVoteClicked} isVoting={isVoting} />
                    <CountdownTimer
                        shouldCountDown={isVoting}
                        countdownTimeInSeconds={VOTE_TIME_IN_SECONDS}
                        onCountdownComplete={onVoteDone}
                    />
                    <p>
                        Your current score is: <code>-1</code>
                    </p>
                </div>
            </div>
            <div id="about" className="about-game-wrapper">
                <h2 className="about-game-header">About This Game</h2>
                <p className="about-game-text">
                    Once you&apos;ve thrown down your speculation in your vote; you won&apos;t be
                    able to vote for 60 seconds. Those are the rules. I don&apos;t make them, I just
                    enforce them.
                </p>
                <p className="about-game-text">
                    You don&apos;t have to sign up to play, but that limits how we can keep track of
                    your score. If you feel worried about entering your email, don&apos;t worry, you
                    can make up any information you like. Do not that we do store it, however we are
                    working on functionality where you can delete your profile if you so wish to do
                    so.
                </p>
                <p className="about-game-text">
                    However, if you do not feel like dealing with the hassle of signing up, you can
                    just vote and we will create a &quot;fake&quot; profile for you. This will allow
                    you to vote, and it will allow us to keep track of your score; albeit only for
                    the current session.
                </p>
            </div>
            <div id="contact" className="contact-info-wrapper">
                <h2 className="contact-info-header">Contact</h2>
                <p className="contact-info-text">
                    This is an open-source project, with 2 key repositories. One being what you see
                    in front of you, powered by <code>React</code>, and then of course the back-end
                    running behind the scenes on <code>Go</code>. Take the time to check out either
                    repositories and report any issues if you find them! Feel free to contact me on
                    Github if you have any suggestions.
                </p>
                <div className="contact-info-repo-cards-wrapper">
                    <a href="https://github.com/svbygoibear/hermes-crypto">
                        <img
                            src="https://github-readme-stats.vercel.app/api/pin/?username=dawsonbooth&repo=react-repo-card&show_owner=true"
                            alt="hermes-crypto GitHub Stats"
                        />
                    </a>
                    <a href="https://github.com/svbygoibear/hermes-crypto-core">
                        <img
                            src="https://github-readme-stats.vercel.app/api/pin/?username=dawsonbooth&repo=react-repo-card&show_owner=true"
                            alt="hermes-crypto-core GitHub Stats"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};
