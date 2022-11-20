import { loadMenuRules } from "./load-menu-rules";

describe("loadMenuRules", () => {
  it("should load 1 for Hirer role", () => {
    // brittle; coded to date in load-men-rules
    let result = loadMenuRules(["Hirer"]);
    expect(result.length).toBe(1);
  });

  it("should load 3 for Hirer role inside Employers", () => {
    // brittle; coded to date in load-men-rules
    let result = loadMenuRules(["Hirer"]);
    expect(result[0].items.length).toBe(3);
  });

  it("should load 3 for Admin role", () => {
    // brittle; coded to date in load-men-rules
    let result = loadMenuRules(["Administrator"]);
    expect(result.length).toBe(3);
  });
});
