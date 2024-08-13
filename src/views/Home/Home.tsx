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

export const Home: React.FunctionComponent = () => {
    const [isVoting, setIsVoting] = useState<boolean>(false);
    const [isCheckingVote, setIsCheckingVote] = useState<boolean>(true);
    const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);
    const [latestBtc, setLatestBtc] = useState<CoinResult | null>(null);
    const [isFetchingBtc, setIsFetchingBtc] = useState<boolean>(false);

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
    }, []);

    const setupPageData = async (): Promise<void> => {
        // We have a user in redux, so we need to fetch their latest data
        if (user.currentUser !== null) {
            const latestVotes = await getUserVotesById(user.currentUser?.id ?? "");
            const unResolvedVote = latestVotes?.find(vote => vote.coin_value === 0);
            console.log("UNRESOLVED VOTE=", unResolvedVote);
            if (unResolvedVote) {
                setIsVoting(true);
                const voteCastTime = new Date(unResolvedVote.vote_date_time).getTime();
                const currentTime = new Date().getTime();
                const isMoreThanSixtySecondsAgo =
                    currentTime - voteCastTime >= VOTE_TIME_IN_SECONDS * 1000;
                console.log("IS MORE THAN SIXTY SECONDS AGO=", isMoreThanSixtySecondsAgo);
                // if the vote was cast more than 60 seconds ago, we need to get the results
                if (isMoreThanSixtySecondsAgo) {
                    const voteResult = await getUserVoteResultById(user.currentUser?.id ?? "");
                    console.log("THIS IS THE VOTE RESULT ON LOAD=", voteResult);
                    if (voteResult?.coin_value !== 0) {
                        // TODO: add a pop-up or something to show the user the result of their vote
                        const previousScore = user.currentUser?.score ?? 0;

                        const updatedUser = await getUserById(user.currentUser?.id ?? "");
                        // Update the user in the store
                        if (updatedUser !== null) {
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
                const latestUserData = await getUserById(user.currentUser?.id ?? "");
                if (latestUserData !== null) {
                    dispatch(setUser(latestUserData));
                }
            }
        }

        setIsCheckingVote(false);
    };

    const getBTC = async (): Promise<void> => {
        // TODO: add call to the API back
        const currentBtcPrice = null; //await getCurrentBtcPrice();
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
            }, 5000); // 5000 milliseconds = 5 seconds
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
        let currUser = user.currentUser;
        // First, determine if we need to make a "dummy" user for someone who is not logged in.
        if (user.isLoggedIn === false) {
            setIsCreatingUser(true);
            // if user is not logged in, create a user
            const userToCreate = createFakeUser();
            console.log("FAKER USER=", userToCreate);
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
            console.log("NEW VOTE=", newVote);
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

            console.log("NEW VOTE FROM API=", vote);
        } catch (error) {
            console.error("Error from the home=", error);
            throw error;
        }
    };

    const onVoteDone = async (): Promise<void> => {
        // TODO: add a pop-up or something to show the user the result of their vote
        const previousScore = user.currentUser?.score ?? 0;
        const newResult = await getDelayedVoteResult(user.currentUser?.id ?? "");
        if (newResult !== null) {
            setNewBtcPriceFromVoteResult(newResult);
            const updatedUser = await getUserById(user.currentUser?.id ?? "");
            // Update the user in the store
            if (updatedUser !== null) {
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
            console.log(newUser);

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
        if (user.isLoggedIn === false && isCheckingVote === false) {
            setIsCreatingUser(true);
            const userToCreate: UserCreate = {
                email: email,
                name: name
            };
            createNewUser(userToCreate, true);
        }
    };

    return (
        <div className="home-wrapper">
            <div id="my-game">
                <AppNameAndLogo />
                <WelcomeSignNote
                    doesUserExist={user.currentUser !== null}
                    userEmail={user.currentUser?.email ?? ""}
                    userName={user.currentUser?.name ?? ""}
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
