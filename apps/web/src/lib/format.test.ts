import { describe, expect, it } from "vitest";
import { buildCanonical, formatNpr } from "./format";

describe("format helpers", () => {
  it("builds canonical URL", () => {
    expect(buildCanonical("https://hotellilain.com/", "/rooms")).toBe("https://hotellilain.com/rooms");
  });

  it("formats NPR amounts", () => {
    expect(formatNpr(12500)).toMatch("12");
  });
});
