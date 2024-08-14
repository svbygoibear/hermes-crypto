import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppNameAndLogo } from "./AppNameAndLogo";
import "@testing-library/jest-dom";

describe("Simple AppNameAndLogo Render Test", () => {
    it("the title is visible", () => {
        render(<AppNameAndLogo />);
        expect(screen.getByText("Hermes-Crypto")).toBeInTheDocument();
    });
});
