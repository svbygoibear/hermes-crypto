/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Stack from "@mui/material/Stack";
import "./VoteButtons.css";
import { Vote } from "../../enums";
import useErrorHandler from "../../hooks/useErrorHandler";
import { Container } from "@mui/material";

export interface VoteButtonsProps {
    onVote: (currentVote: Vote) => Promise<void>;
    isVoting: boolean;
}

export const VoteButtons: React.FunctionComponent<VoteButtonsProps> = (props: VoteButtonsProps) => {
    const [isVotingLoading, setIsVotingLoading] = useState<boolean>(false);
    const [error, handleError] = useErrorHandler();

    useEffect(() => {
        if (error) {
            console.log(error.message);
        }
    }, [error]);

    const onVoteDone = (): void => {
        setIsVotingLoading(false);
    };

    const onVoteClicked = async (currentVote: Vote): Promise<void> => {
        setIsVotingLoading(true);
        try {
            await props.onVote(currentVote);
            setTimeout(() => {
                onVoteDone();
            }, 60000);
        } catch (error) {
            onVoteDone();
            handleError(error as Error);
        }
    };

    const onVoteUp = async (): Promise<void> => {
        onVoteClicked(Vote.Up);
    };

    const onVoteDown = async (): Promise<void> => {
        onVoteClicked(Vote.Down);
    };

    return (
        <Container maxWidth="sm" sx={{ paddingBottom: "20px" }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <LoadingButton
                    loading={props.isVoting}
                    loadingPosition="end"
                    endIcon={<ArrowCircleUpIcon />}
                    variant="outlined"
                    onClick={onVoteUp}
                    color="success"
                    sx={{ backgroundColor: "honeydew" }}>
                    <div className="vote-button-text">Vote UP</div>
                </LoadingButton>
                <LoadingButton
                    loading={props.isVoting}
                    loadingPosition="start"
                    startIcon={<ArrowCircleDownIcon />}
                    variant="outlined"
                    onClick={onVoteDown}
                    color="warning"
                    sx={{ backgroundColor: "beige" }}>
                    <div className="vote-button-text">Vote DOWN</div>
                </LoadingButton>
            </Stack>
        </Container>
    );
};
