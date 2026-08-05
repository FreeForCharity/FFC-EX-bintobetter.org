import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

describe("PhotoSlot", () => {
  it("renders an img with alt when src is given", () => {
    render(<PhotoSlot src="/members/Anika Batra.png" alt="Anika Batra" />);
    expect(screen.getByAltText("Anika Batra")).toBeInTheDocument();
  });
  it("renders a branded placeholder when src is missing", () => {
    render(<PhotoSlot alt="Coming soon" />);
    expect(screen.getByRole("img", { name: "Coming soon" })).toBeInTheDocument();
  });
});
