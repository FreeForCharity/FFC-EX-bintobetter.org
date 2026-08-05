import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const pub = (p: string) => path.join(process.cwd(), "public", p);

describe("required assets", () => {
  it("has both logo variants", () => {
    expect(fs.existsSync(pub("logo.webp"))).toBe(true);
    expect(fs.existsSync(pub("logo-white.png"))).toBe(true);
  });
  it("has member, partner, and bounce-back image folders with files", () => {
    for (const dir of ["members", "partners-logos", "bounce-back-logos"]) {
      const files = fs.readdirSync(pub(dir));
      expect(files.length).toBeGreaterThan(0);
    }
  });
  it("has an Apache LICENSE with FFC attribution", () => {
    const txt = fs.readFileSync(path.join(process.cwd(), "LICENSE"), "utf8");
    expect(txt).toContain("Free For Charity");
    expect(txt).toContain("EIN: 46-2471893");
    expect(txt).toContain("Apache License");
  });
});
