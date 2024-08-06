import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VoteButtons } from "./VoteButtons";
import "@testing-library/jest-dom";
import { Vote } from "../../enums";

describe("Vote Buttons Test", () => {
    it("both buttons exist", () => {
        render(
            <VoteButtons
                onVote={async (currentVote: Vote) => {
                    console.log(`${currentVote}`);
                }}
            />
        );
        expect(screen.getByText("Vote UP")).toBeInTheDocument();
        expect(screen.getByText("Vote DOWN")).toBeInTheDocument();
    });
});
