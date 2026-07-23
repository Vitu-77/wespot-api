import { isEqualString } from "src/shared/utils/is-equal-strings.util";

describe("isEqualString", () => {
  it("should return true for equal strings", () => {
    const result = isEqualString("string-1", "STRING-1");
    expect(result).toBeTruthy();
  });

  it("should return true for different strings", () => {
    const result = isEqualString("string-1", "other-str");
    expect(result).toBeFalsy();
  });
});
