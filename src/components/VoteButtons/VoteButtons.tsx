import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Stack from "@mui/material/Stack";
import "./VoteButtons.css";
import { VoteDirection } from "../../enums";
import useErrorHandler from "../../hooks/useErrorHandler";
import { Container } from "@mui/material";

export interface VoteButtonsProps {
    onVote: (currentVote: VoteDirection) => Promise<void>;
    isVoting: boolean;
}

export const VoteButtons: React.FunctionComponent<VoteButtonsProps> = (props: VoteButtonsProps) => {
    const [isVotingLoading, setIsVotingLoading] = useState<boolean>(false);
    const [error, handleError] = useErrorHandler();

    useEffect(() => {
        if (error) {
            console.error(error.message);
        }
    }, [error]);

    const onVoteDone = (): void => {
        console.log("Vote done, isVotingLoading=", isVotingLoading);
        setIsVotingLoading(false);
    };

    const onVoteClicked = async (currentVote: VoteDirection): Promise<void> => {
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
        onVoteClicked(VoteDirection.Up);
    };

    const onVoteDown = async (): Promise<void> => {
        onVoteClicked(VoteDirection.Down);
    };

    return (
        <Container maxWidth="sm" sx={{ paddingBottom: "20px" }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <LoadingButton
                    loading={props.isVoting}
                    loadingPosition="end"
                    endIcon={<ArrowCircleUpIcon />}
                    variant="contained"
                    onClick={onVoteUp}
                    color="primary">
                    <div className="vote-button-text">Vote UP</div>
                </LoadingButton>
                <LoadingButton
                    loading={props.isVoting}
                    loadingPosition="start"
                    startIcon={<ArrowCircleDownIcon />}
                    variant="contained"
                    onClick={onVoteDown}
                    color="secondary">
                    <div className="vote-button-text">Vote DOWN</div>
                </LoadingButton>
            </Stack>
        </Container>
    );
};
