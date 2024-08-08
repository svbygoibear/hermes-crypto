import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Stack from "@mui/material/Stack";
import "./VoteButtons.css";
import { Vote } from "../../enums";
import useErrorHandler from "../../hooks/useErrorHandler";

export interface VoteButtonsProps {
    onVote: (currentVote: Vote) => Promise<void>;
}

export const VoteButtons: React.FunctionComponent<VoteButtonsProps> = (props: VoteButtonsProps) => {
    const [isVotingLoading, setIsVotingLoading] = useState<boolean>(false);
    const [error, handleError] = useErrorHandler();

    useEffect(() => {
        if (error) {
            console.log(error.message);
        }
    }, [error]);

    const onVoteClicked = async (currentVote: Vote): Promise<void> => {
        setIsVotingLoading(true);
        try {
            await props.onVote(currentVote);
        } catch (error) {
            handleError(error as Error);
        } finally {
            setIsVotingLoading(false);
        }
    };

    const onVoteUp = async (): Promise<void> => {
        onVoteClicked(Vote.Up);
    };

    const onVoteDown = async (): Promise<void> => {
        onVoteClicked(Vote.Down);
    };

    return (
        <Stack direction="row" spacing={2}>
            <LoadingButton
                loading={isVotingLoading}
                loadingPosition="end"
                endIcon={<ArrowCircleUpIcon />}
                variant="outlined"
                onClick={onVoteUp}
                color="success">
                <div className="vote-button-text">Vote UP</div>
            </LoadingButton>
            <LoadingButton
                loading={isVotingLoading}
                loadingPosition="start"
                startIcon={<ArrowCircleDownIcon />}
                variant="outlined"
                onClick={onVoteDown}
                color="warning">
                <div className="vote-button-text">Vote DOWN</div>
            </LoadingButton>
        </Stack>
    );
};
