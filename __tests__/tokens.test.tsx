import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("brand tokens", () => {
  it("applies a bg-paper utility without error", () => {
    const { container } = render(<div className="bg-paper text-emerald" />);
    expect(container.firstChild).toHaveClass("bg-paper");
    expect(container.firstChild).toHaveClass("text-emerald");
  });
});
