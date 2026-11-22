import { describe, it, expect } from "vitest";
import { donate } from "@/content/donate";

describe("donate impact tiers", () => {
  /**
   * The tiers are a promise to donors ("$50 = 250 balls"). If the rate changes,
   * every tier has to move with it, or the page states two different rates.
   */
  it("prices every tier at the same balls-per-dollar rate", () => {
    for (const t of donate.tiers) {
      expect(t.balls).toBe(t.amount * donate.ballsPerDollar);
    }
  });

  it("lists tiers in ascending order with exactly one featured", () => {
    const amounts = donate.tiers.map((t) => t.amount);
    expect(amounts).toEqual([...amounts].sort((a, b) => a - b));
    expect(donate.tiers.filter((t) => t.featured)).toHaveLength(1);
  });
});
