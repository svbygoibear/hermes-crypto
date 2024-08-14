/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import { AppNameAndLogo } from "../../components/AppNameAndLogo/AppNameAndLogo";
import { CountdownTimer } from "../../components/CountdownTimer/CountdownTimer";
import { HowToWorkText } from "../../components/HowToWorkText/HowToWorkText";
import { VoteButtons } from "../../components/VoteButtons/VoteButtons";
import { WelcomeSignNote } from "../../components/WelcomeSignNote/WelcomeSignNote";
import {
    getCurrentBtcPrice,
    getUserById,
    getUserVotesById,
    addUser,
    addUserVote,
    getUserVoteResultById
} from "../../data/user.data";

import { CoinResult } from "../../types/coinResult";
import { User, UserCreate } from "../../types/user";
import { Vote, VoteCreate } from "../../types/vote";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setLoggedIn, setUser } from "../../store/userSlice";
import { createFakeUser } from "../../utils/fake.utils";
import { CoinType, Currency, VoteDirection } from "../../enums";
import { VOTE_TIME_IN_SECONDS } from "../../constants";
import { ResultsAlert } from "../../components/ResultsAlert/ResultsAlert";
import { CalculatedResult } from "../../types/calculatedResult";

export const Home: React.FunctionComponent = () => {
    const [isVoting, setIsVoting] = useState<boolean>(false);
    const [isCheckingVote, setIsCheckingVote] = useState<boolean>(true);
    const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);
    const [latestBtc, setLatestBtc] = useState<CoinResult | null>(null);
    const [isFetchingBtc, setIsFetchingBtc] = useState<boolean>(false);
    const [showResultsAlert, setShowResultsAlert] = useState<boolean>(false);
    const [calculatedResult, setCalculatedResult] = useState<CalculatedResult | null>(null);

    // We start off with a default of 60 seconds for the countdown timer
    const timerStartTime = React.useRef<number>(VOTE_TIME_IN_SECONDS);

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    // Used for navigation scrolling of the global app header
    const location = useLocation();
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
        // Get & set the current bitcoin data
        void getBTC();
        // Perform page setup based on the user
        void setupPageData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calculateResult = (previousScore: number, currenScore: number): CalculatedResult => {
        const changeAmount = Math.abs(currenScore - previousScore);
        const message = `Your score has ${currenScore > previousScore ? "increased" : "decreased"} by ${changeAmount} point${changeAmount > 1 ? "s" : ""}!`;

        return { message: message, isPositive: currenScore > previousScore };
    };

    const setupPageData = async (): Promise<void> => {
        // We have a user in redux, so we need to fetch their latest data
        if (user?.currentUser !== null) {
            const latestVotes = await getUserVotesById(user?.currentUser?.id ?? "");
            const unResolvedVote = latestVotes?.find(vote => vote.coin_value === 0);
            if (unResolvedVote) {
                setIsVoting(true);
                const voteCastTime = new Date(unResolvedVote.vote_date_time).getTime();
                const currentTime = new Date().getTime();
                const isMoreThanSixtySecondsAgo =
                    currentTime - voteCastTime >= VOTE_TIME_IN_SECONDS * 1000;
                // if the vote was cast more than 60 seconds ago, we need to get the results
                if (isMoreThanSixtySecondsAgo) {
                    const voteResult = await getUserVoteResultById(user?.currentUser?.id ?? "");
                    if (voteResult?.coin_value !== 0) {
                        const updatedUser = await getUserById(user?.currentUser?.id ?? "");
                        // Update the user in the store
                        if (updatedUser !== null) {
                            // First, set an alert for the user
                            const previousScore = user?.currentUser?.score ?? 0;
                            const newCalculatedResult = calculateResult(
                                previousScore,
                                updatedUser.score
                            );
                            setCalculatedResult(newCalculatedResult);
                            setShowResultsAlert(true);
                            // Update the user in the store
                            dispatch(setUser(updatedUser));
                        }
                    }
                    setIsVoting(false);
                } else {
                    const timeLeft = Math.floor(
                        (VOTE_TIME_IN_SECONDS * 1000 - (currentTime - voteCastTime)) / 1000
                    );
                    timerStartTime.current = timeLeft;
                }
            } else {
                const latestUserData = await getUserById(user?.currentUser?.id ?? "");
                if (latestUserData !== null) {
                    dispatch(setUser(latestUserData));
                }
            }
        }

        setIsCheckingVote(false);
    };

    const getBTC = async (): Promise<void> => {
        const currentBtcPrice = await getCurrentBtcPrice();
        setLatestBtc(currentBtcPrice);
        setIsFetchingBtc(false);
    };

    const getDelayedVoteResult = async (userId: string): Promise<Vote | null> => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const voteResult = await getUserVoteResultById(userId);
                    resolve(voteResult);
                } catch (error) {
                    reject(error);
                }
            }, 5000); 
        });
    };

    const setNewBtcPriceFromVoteResult = async (vote: Vote | null): Promise<void> => {
        const newBtc: CoinResult = {
            coin_value: vote?.coin_value ?? 0,
            coin_value_currency: Currency.USD,
            vote_coin: CoinType.Bitcoin,
            query_time: new Date().toISOString()
        };
        if (newBtc.coin_value !== 0) {
            setLatestBtc(newBtc);
        }
    };

    const onVoteClicked = async (currVoteDirection: VoteDirection): Promise<void> => {
        setIsCheckingVote(true);
        let currUser = user?.currentUser;
        // First, determine if we need to make a "dummy" user for someone who is not logged in.
        if (user?.isLoggedIn === false) {
            setIsCreatingUser(true);
            // if user is not logged in, create a user
            const userToCreate = createFakeUser();
            const newUser = await createNewUser(userToCreate, true);
            currUser = newUser;
        }
        // Now carry out the voting process
        try {
            const newVote: VoteCreate = {
                vote_direction: currVoteDirection,
                vote_coin: CoinType.Bitcoin,
                coin_value_currency: Currency.USD
            };
            const vote = await addUserVote(newVote, currUser?.id ?? "");
            if (vote === null) {
                const voteResult = await getDelayedVoteResult(currUser?.id ?? "");

                if (voteResult?.coin_value !== 0) {
                    setNewBtcPriceFromVoteResult(voteResult);
                    const updatedUser = await getUserById(currUser?.id ?? "");
                    // Update the user in the store
                    if (updatedUser !== null) {
                        dispatch(setUser(updatedUser));
                    }
                }
                setIsCheckingVote(false);
            } else {
                setIsCheckingVote(false);
                setIsVoting(true);
            }
        } catch (error) {
            console.error("Error from the home=", error);
            throw error;
        }
    };

    const onVoteDone = async (): Promise<void> => {
        const previousScore = user?.currentUser?.score ?? 0;
        const newResult = await getDelayedVoteResult(user?.currentUser?.id ?? "");
        if (newResult !== null) {
            setNewBtcPriceFromVoteResult(newResult);
            const updatedUser = await getUserById(user?.currentUser?.id ?? "");
            // Update the user in the store
            if (updatedUser !== null) {
                const newCalculatedResult = calculateResult(previousScore, updatedUser.score);
                setCalculatedResult(newCalculatedResult);
                setShowResultsAlert(true);
                dispatch(setUser(updatedUser));
            }
        }
        setIsVoting(false);
    };

    const createNewUser = async (
        userToCreate: UserCreate,
        shouldSetLoggedIn: boolean
    ): Promise<User | null> => {
        try {
            const newUser = await addUser(userToCreate);

            if (newUser !== null) {
                // Update the user in the store
                dispatch(setUser(newUser));
                // Set the user as logged in
                if (shouldSetLoggedIn) {
                    dispatch(setLoggedIn(true));
                }
                return newUser;
            }
            return null;
        } catch (error) {
            throw new Error("Failed to sign in.");
        } finally {
            setIsCreatingUser(false);
        }
    };

    const onSignInOrOn = async (name: string, email: string): Promise<void> => {
        // No user should be logged in & we should not be actively checking the current user vote
        // before allowing a user to sign in/sign up
        if (user?.isLoggedIn === false && isCheckingVote === false) {
            setIsCreatingUser(true);
            const userToCreate: UserCreate = {
                email: email.toLocaleLowerCase(),
                name: name
            };
            createNewUser(userToCreate, true);
        }
    };

    const onCloseResultsAlert = (): void => {
        setShowResultsAlert(false);
        setCalculatedResult(null);
    };

    return (
        <div className="home-wrapper">
            <div id="my-game">
                <AppNameAndLogo />
                <WelcomeSignNote
                    doesUserExist={user?.currentUser !== null}
                    userEmail={user?.currentUser?.email ?? ""}
                    userName={user?.currentUser?.name ?? ""}
                    onSignIn={onSignInOrOn}
                />
                <HowToWorkText isFetchingBtc={isFetchingBtc} currentCoinResult={latestBtc} />
                <div className="card">
                    <VoteButtons
                        onVote={onVoteClicked}
                        isVoting={isVoting || isCreatingUser || isCheckingVote}
                    />
                    <CountdownTimer
                        shouldCountDown={isVoting}
                        countdownTimeInSeconds={timerStartTime.current}
                        onCountdownComplete={onVoteDone}
                    />
                    <div className="score-text-wrapper">
                        <p className="score-text">
                            <b>
                                Your current score is: <code>{user?.currentUser?.score ?? 0}</code>
                            </b>
                        </p>
                    </div>
                    <ResultsAlert
                        isOpen={showResultsAlert}
                        alertText={calculatedResult?.message ?? ""}
                        isPositive={calculatedResult?.isPositive ?? false}
                        onClose={onCloseResultsAlert}
                    />
                </div>
            </div>
            <div id="about" className="about-game-wrapper">
                <h2 className="about-game-header">About This Game</h2>
                <p className="about-game-text">
                    You don&apos;t have to sign up to play, but that limits how we can keep track of 
                    your score. If you feel worried about entering your email, don&apos;t stress, you 
                    can enter any unique identifier into the email field. Just so you know, we store 
                    this information, but we are working on functionality where you can delete your 
                    profile if you want to do so.
                </p>
                <p className="about-game-text">
                    However, if you do not feel like dealing with the hassle of signing up, you can simply 
                    vote and we will create a temporary profile for you. This will allow you to vote, and 
                    it will enable us to keep track of your score; albeit only for the current session.
                </p>
                <p className="about-game-text">
                    <code className="code-info-style">Hermes-Crypto</code> is a fun site to pass the time 
                    while you wait for your code to build, a deployment to finish, or just want to kill 
                    some time while your ’spro is brewing.
                </p>
            </div>
            <div id="contact" className="contact-info-wrapper">
                <h2 className="contact-info-header">Contact</h2>
                <p className="contact-info-text">
                    This is an open-source project with 2 key repositories: <code className="code-info-style">React</code> on 
                    the front-end and <code className="code-info-style">Go</code> on the back-end. Take the time to check 
                    out either repository and report any issues if you find them! Feel free to contact me 
                    on <a href="https://github.com/svbygoibear">Github</a> if you have any suggestions.
                </p>
                <div className="contact-info-repo-cards-wrapper">
                    <a href="https://github.com/svbygoibear/hermes-crypto">
                        <img
                            src="https://github-readme-stats.vercel.app/api/pin/?username=svbygoibear&repo=hermes-crypto"
                            alt="hermes-crypto GitHub Stats"
                        />
                    </a>
                    <a href="https://github.com/svbygoibear/hermes-crypto-core">
                        <img
                            src="https://github-readme-stats.vercel.app/api/pin/?username=svbygoibear&repo=hermes-crypto-core"
                            alt="hermes-crypto-core GitHub Stats"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};
