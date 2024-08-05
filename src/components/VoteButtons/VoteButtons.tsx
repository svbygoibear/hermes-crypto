import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Vote } from "../../enums";

export interface VoteButtonsProps {
    onVote: (currentVote: Vote) => void;
}

export const VoteButtons: React.FunctionComponent<VoteButtonsProps> = (props: VoteButtonsProps) => {
    const onVoteUp = () => {
        props.onVote(Vote.Up);
    };
    const onVoteDown = () => {
        props.onVote(Vote.Down);
    };

    return (
        <ButtonGroup variant="contained" aria-label="Vote buttons">
            <Button onClick={onVoteUp}>Going UP</Button>
            <Button onClick={onVoteDown}>Crashing DOWN</Button>
        </ButtonGroup>
    );
};
