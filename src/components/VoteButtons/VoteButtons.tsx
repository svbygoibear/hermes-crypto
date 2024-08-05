import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
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
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                onClick={onVoteUp}>
                Vote UP
            </LoadingButton>
            <LoadingButton
                loading={isVotingLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                onClick={onVoteDown}>
                Vote Down
            </LoadingButton>
        </Stack>
    );
};
