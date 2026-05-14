import { describe, expect, it } from "vitest";
import { addTwoNumbers } from "./main";

describe("addTwoNumbers", () => {
  it("adds two numbers", () => {
    expect(addTwoNumbers(1, 2)).toBe(3);
  });
});
