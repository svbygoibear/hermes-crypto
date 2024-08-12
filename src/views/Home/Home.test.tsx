import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Home } from "./Home";
import "@testing-library/jest-dom";

describe("Simple Home Render Test", () => {
    it("the title is visible", () => {
        render(<Home isLoggedIn />);
        expect(screen.getByText("Hermes-Crypto")).toBeInTheDocument();
    });
});
