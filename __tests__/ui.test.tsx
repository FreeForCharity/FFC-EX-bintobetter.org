import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";

describe("ui primitives", () => {
  it("Button renders a link to href with label", () => {
    render(<Button href="/donate">Donate</Button>);
    const link = screen.getByRole("link", { name: "Donate" });
    expect(link).toHaveAttribute("href", "/donate");
  });
  it("Button secondary variant applies outline styles", () => {
    render(<Button href="/x" variant="secondary">X</Button>);
    expect(screen.getByRole("link", { name: "X" }).className).toContain("border");
  });
  it("Stat shows value and label", () => {
    render(<Stat value="50K+" label="Tennis Balls Collected" />);
    expect(screen.getByText("50K+")).toBeInTheDocument();
    expect(screen.getByText("Tennis Balls Collected")).toBeInTheDocument();
  });
});
