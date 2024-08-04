import React from "react";
import { render, screen } from "@testing-library/react";
import * as ue from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import "@testing-library/jest-dom";

describe("Simple App Render Test", () => {
    it("the title is visible", () => {
        render(<App />);
        expect(screen.getByText("HermesCrypto + React")).toBeInTheDocument();
    });

    it("should increment count on click", async () => {
        render(<App />);
        const counter = screen.getByRole("button", { name: /count is/i });
        expect(counter.textContent).toBe("count is 0");
        await ue.userEvent.click(counter);
        expect(counter.textContent).toBe("count is 1");
    });
});
